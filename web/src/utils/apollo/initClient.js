const { ApolloClient, InMemoryCache, HttpLink } = require('apollo-boost')
const { SchemaLink } = require('apollo-link-schema')
let apolloClient = null

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
