const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')

let apolloClient = null

module.exports = function() {
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
    const { SchemaLink } = require('apollo-link-schema')
    const schema = require('./schema').default

    return new SchemaLink({ schema })
  } else {
    const { HttpLink } = require('apollo-link-http')

    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    })
  }
}
