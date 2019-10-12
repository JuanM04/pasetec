const path = require('path'),
  fetch = require('node-fetch'),
  { ApolloClient, HttpLink, InMemoryCache } = require('apollo-boost'),
  queries = require('./queries'),
  isDev = require('electron-is-dev')

require('dotenv').config({
  path: path.resolve(__dirname, `../.env${isDev ? '.test' : ''}`),
})

// Apollo Client
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

const sendStatusError = (err, e) => {
  e.reply('status', {
    type: 'ERROR',
    message: JSON.stringify(err),
  })
}

module.exports = ipcMain => {
  // Yep, there's a lot of listeners
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
