import { ApolloClient, ApolloClientOptions } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const URI = process.env.REACT_APP_GRAPHQL_URL || 'http://45.77.170.14:7001/graphql'

const httpLink = createHttpLink({
  uri: URI,
  credentials: 'include'
})
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token')
//   const cookie = document.cookie
//   console.error(`ci`, cookie)
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       Cookie: cookie,
//       authorization: '11111111111111111'
//     }
//   }
// })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

export default client
