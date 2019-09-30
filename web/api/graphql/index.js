const { ApolloServer } = require('apollo-server-micro')
const typeDefs = require('./type-defs')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => ({
    authed: req.headers.secret === process.env.SECRET,
  }),
})

module.exports = server.createHandler({ path: '/api/graphql' })
