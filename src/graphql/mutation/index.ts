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

const DELETE_POST_BY_ID = gql`
  mutation deletePost($post: InputRemovePost!) {
    deletePost(post: $post) {
      success
      message
    }
  }
`
const mutation = {
  LOGIN,
  CREATE_POST,
  DELETE_POST_BY_ID
}

export default mutation
