import initClient from './initClient'
import { gql } from 'apollo-boost'

export default initClient()

export const GET_VIAJES = gql`
  query GET_VIAJES($dni: Int!) {
    user(dni: $dni) {
      dni
      viajes
    }
  }
`

export const GET_PRICES = gql`
  query GET_PRICES {
    metadata {
      pasePrice
      viajePrice
    }
  }
`
