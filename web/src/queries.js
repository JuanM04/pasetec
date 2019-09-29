import graphql from 'graphql.js'
const graph = graphql('/api/graphql', {
  asJSON: true,
})

export const getViajes = graph(`
  query GET_VIAJES($dni: Int) {
    getUser(dni: $dni) {
      viajes
    }
  }
`)

export const getPrices = graph(`
  query GET_PRICES {
    getMetadata {
      pasePrice
      viajePrice
    }
  }
`)
