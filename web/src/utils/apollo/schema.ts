import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from 'pages/api/graphql/type-defs'
import resolvers from 'pages/api/graphql/resolvers'

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
