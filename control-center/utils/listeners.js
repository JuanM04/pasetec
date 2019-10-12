const path = require('path'),
  fetch = require('node-fetch'),
  { ApolloClient, HttpLink, InMemoryCache, gql } = require('apollo-boost'),
  isDev = require('electron-is-dev')

require('dotenv').config({
  path: path.resolve(__dirname, `../.env${isDev ? '.test' : ''}`),
})

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.BASE_URL}/api/graphql`,
    fetch,
    headers: {
      Secret: process.env.SECRET,
    },
  }),
  cache: new InMemoryCache(),
})

const queries = {
  getUser: gql`
    query($id: ID, $uid: String, $dni: Int) {
      user(id: $id, uid: $uid, dni: $dni) {
        id
        uid
        dni
        viajes
      }
    }
  `,
  getPrices: gql`
    query {
      metadata {
        pasePrice
        viajePrice
      }
    }
  `,
  addViajes: gql`
    mutation($id: ID, $newViajes: Int!) {
      addViajes(id: $id, newViajes: $newViajes)
    }
  `,
  createUser: gql`
    mutation($uid: String!, $dni: Int!) {
      createUser(uid: $uid, dni: $dni) {
        id
      }
    }
  `,
  updateUser: gql`
    mutation($id: ID!, $uid: String!, $dni: Int!, $viajes: Int!) {
      updateUser(id: $id, uid: $uid, dni: $dni, viajes: $viajes) {
        id
      }
    }
  `,
  updatePrices: gql`
    mutation($pasePrice: Int!, $viajePrice: Int!) {
      updateMetadata(pasePrice: $pasePrice, viajePrice: $viajePrice) {
        id
      }
    }
  `,
}

const sendStatusError = (err, e) => {
  e.reply('status', {
    type: 'ERROR',
    message: JSON.stringify(err),
  })
}

module.exports = ipcMain => {
  ipcMain.on('get-user', (e, variables) =>
    client
      .query({ query: queries.getUser, variables })
      .then(({ data }) => {
        if (data.user) e.reply('get-user-res', data.user)
        else throw 'El usuario no se ha encontrado'
      })
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('add-viajes', (e, variables) =>
    client
      .mutate({ mutation: queries.addViajes, variables })
      .then(({ data }) => e.reply('add-viajes-res', data.addViajes))
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('create-user', (e, variables) =>
    client
      .mutate({ mutation: queries.createUser, variables })
      .then(() => e.reply('status', { type: 'USER_CREATED' }))
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('update-user', (e, variables) =>
    client
      .mutate({ mutation: queries.updateUser, variables })
      .then(() => e.reply('status', { type: 'USER_UPDATED' }))
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('get-prices', (e, variables) =>
    client
      .query({ query: queries.getPrices, variables })
      .then(({ data }) => e.reply('get-prices-res', data.metadata))
      .catch(err => sendStatusError(err, e))
  )

  ipcMain.on('update-prices', (e, variables) =>
    client
      .mutate({ mutation: queries.updatePrices, variables })
      .then(() => e.reply('status', { type: 'PRICES_UPDATED' }))
      .catch(err => sendStatusError(err, e))
  )
}
