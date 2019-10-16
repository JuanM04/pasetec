import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { SchemaLink } from 'apollo-link-schema'
let apolloClient = null

// Always creates a new client in the server, and sometimes in the client
export default function() {
  if (typeof window === 'undefined') return createApolloClient()
  if (!apolloClient) apolloClient = createApolloClient()

  return apolloClient
}

function createApolloClient() {
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache()

  return new ApolloClient({
    ssrMode,
    link: createIsomorphLink(),
    cache,
  })
}

// Creates link: if in the server, uses directly the schema; otherwise creates an http-link
function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const schema = require('./schema').default
    return new SchemaLink({ schema })
  } else {
    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    })
  }
}
