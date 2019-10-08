import initClient from './initClient'
import gql from 'graphql-tag'

export default initClient()

export const GET_VIAJES = gql`
  query GET_VIAJES($dni: Int!) {
    getUser(dni: $dni) {
      viajes
    }
  }
`

export const GET_PRICES = gql`
  query GET_PRICES {
    getMetadata {
      pasePrice
      viajePrice
    }
  }
`
