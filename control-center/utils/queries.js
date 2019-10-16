const { gql } = require('apollo-boost')

module.exports = {
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
