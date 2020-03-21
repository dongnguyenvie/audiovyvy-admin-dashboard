import { ApolloClient, ApolloClientOptions } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

export default client
