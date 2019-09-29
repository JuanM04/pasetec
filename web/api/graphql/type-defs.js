const { gql } = require('apollo-server-micro')

module.exports = gql`
  scalar Date

  type User {
    id: ID!
    uid: String!
    dni: Int!
    viajes: Int
  }

  type Metadata {
    id: ID!
    date: String!
    pasePrice: Int
    viajePrice: Int
  }

  type Query {
    getUser(id: ID, uid: String, dni: Int): User
    getMetadata: Metadata
  }

  type Mutation {
    addViajes(id: ID, uid: String, dni: Int, newViajes: Int!): Int
    createUser(uid: String!, dni: Int!): User
    updateUser(id: ID!, uid: String!, dni: Int!, viajes: Int!): User
    updateMetadata(pasePrice: Int!, viajePrice: Int!): Metadata
  }
`
