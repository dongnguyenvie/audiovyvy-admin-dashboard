import { ApolloClient, ApolloClientOptions } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const URI = process.env.REACT_APP_GRAPHQL_URL || 'http://45.77.170.14:7001/graphql'

const httpLink = createHttpLink({
  uri: URI
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

export default client
