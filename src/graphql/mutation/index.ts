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
const CREATE_POST = gql`
  mutation CREATE_POST($post: InputCreatePost!) {
    createPost(post: $post) {
      success
      result {
        id
        title
        content
      }
    }
  }
`
const mutation = {
  LOGIN,
  CREATE_POST
}

export default mutation
