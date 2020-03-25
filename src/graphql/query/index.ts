import gql from 'graphql-tag'

const GET_POSTS = gql`
  query getPosts($filters: InputPagingRequest) {
    getPosts(filters: $filters) {
      docs {
        id
        title
        content
        metaData
        categories
        user {
          id
          username
          fullName
          avatar
        }
        createdAt
        updatedAt
      }
      prevPage
      nextPage
    }
  }
`

const GET_POST_BY_ID = gql`
  query GET_POST($post: InputPostQuery) {
    getPost(post: $post) {
      success
      result {
        title
        content
        metaData
        categories
        jsonLD
        status
        tags
      }
    }
  }
`

const query = {
  GET_POSTS,
  GET_POST_BY_ID
}
export default query
