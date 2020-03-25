import gql from 'graphql-tag'

const POSTS = gql`
  query getPosts($filters: InputPagingRequest) {
    getPosts(filters: $filters) {
      docs {
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

const query = {
  POSTS
}
export default query
