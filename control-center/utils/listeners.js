const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const graphql = require('graphql.js')
const graph = graphql(`${process.env.BASE_URL}/api/graphql`, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Secret: process.env.SECRET,
  },
  asJSON: true,
})

const queries = {
  getUser: graph(`
    query GET_USER($id: ID, $uid: String, $dni: Int) {
      getUser(id: $id, uid: $uid, dni: $dni) {
        id
        uid
        dni
        viajes
      }
    }
  `),
  getPrices: graph(`
    query GET_PRICES {
      getMetadata {
        pasePrice
        viajePrice
      }
    }
  `),
  addViajes: graph(`
    mutation ADD_VIAJES($id: ID, $newViajes: Int!) {
      addViajes(id: $id, newViajes: $newViajes)
    }
  `),
  createUser: graph(`
    mutation CREATE_USER($uid: String!, $dni: Int!) {
      createUser(uid: $uid, dni: $dni) {
        id
      }
    }
  `),
  updateUser: graph(`
    mutation UPDATE_USER($id: ID!, $uid: String!, $dni: Int!, $viajes: Int!) {
      updateUser(id: $id, uid: $uid, dni: $dni, viajes: $viajes) {
        id
      }
    }
  `),
  updatePrices: graph(`
    mutation UPDATE_PRICES($pasePrice: Int!, $viajePrice: Int!) {
      updateMetadata(pasePrice: $pasePrice, viajePrice: $viajePrice) {
        id
      }
    }
  `),
}

const sendStatusError = (err, e) => {
  let message = ''
  if (typeof err === 'string') message = err
  else if (err.errors) message = 'API ERROR\n\n' + err.errors[0].message
  else {
    message = 'Error desconocido\n\n' + JSON.stringify(err)
    console.error(err)
  }

  e.reply('status', { type: 'ERROR', message })
}

module.exports = ipcMain => {
  ipcMain.on('get-user', (e, data) =>
    queries
      .getUser(data)
      .then(({ getUser: user }) => {
        if (user) e.reply('get-user-res', user)
        else throw 'El usuario no se ha encontrado'
      })
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('add-viajes', (e, data) =>
    queries
      .addViajes(data)
      .then(({ addViajes: viajes }) => e.reply('add-viajes-res', viajes))
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('create-user', (e, data) =>
    queries
      .createUser(data)
      .then(() => e.reply('status', { type: 'USER_CREATED' }))
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('update-user', (e, data) =>
    queries
      .updateUser(data)
      .then(() => e.reply('status', { type: 'USER_UPDATED' }))
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('get-prices', (e, data) =>
    queries
      .getPrices(data)
      .then(({ getMetadata: metadata }) => e.reply('get-prices-res', metadata))
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('update-prices', (e, data) =>
    queries
      .updatePrices(data)
      .then(() => e.reply('status', { type: 'PRICES_UPDATED' }))
      .catch(err => sendStatusError(err, e))
  )
}
