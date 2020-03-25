import gql from 'graphql-tag'

const LOGIN = gql`
  mutation login($username: String!, $password: String!, $rememberMe: Boolean!) {
    login(user: { username: $username, password: $password, rememberMe: $rememberMe }) {
      token
      user {
        username
        fullName
        avatar
        email
        phone
        roles {
          id
        }
      }
    }
  }
`
const mutation = {
  LOGIN
}

export default mutation
