import gql from 'graphql-tag'

const LOGIN = gql`
  mutation login($username: String!, $password: String!, $rememberMe: Boolean!) {
    login(user: { username: $username, password: $password, rememberMe: $rememberMe }) {
      success
      token
      user {
        id
        username
        roles {
          id
          permission
          description
          name
        }
        blog
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
