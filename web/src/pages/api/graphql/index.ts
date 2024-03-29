import { ApolloServer } from 'apollo-server-micro'
import typeDefs from './type-defs'
import resolvers from './resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => ({
    authed: req.headers.secret === process.env.SECRET,
  }),
})

export const config = {
  api: { bodyParser: false },
}

export default server.createHandler({ path: '/api/graphql' })
