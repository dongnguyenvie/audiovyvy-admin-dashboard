import { ApolloClient, ApolloClientOptions } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import LocalStorage from '../plugins/localstorage'
import { localStorageKeys } from '../constants'

const URI = process.env.REACT_APP_GRAPHQL_URL || 'http://45.77.170.14:7001/graphql'

const httpLink = createHttpLink({
  uri: URI,
  credentials: 'include'
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = LocalStorage.get(localStorageKeys.AUTH)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // ...(token ? { token } : {})
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

export default client
