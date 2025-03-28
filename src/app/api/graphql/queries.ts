import { gql } from "graphql-request";

export const userQueries = {
  getUsersQuery: gql`
    query GetUsers {
      users {
        id
        username
        email
        role
      }
    }
  `,

  deleteUser: gql`
    mutation DeleteUser($id: ID!) {
      deleteUser(id: $id) {
          id
          username
          email
      }
    }
  `,

  registerUserMutation: gql`
    mutation CreateUser($username: String! $password: String! $email: String! $role: UserRole!) {
      createUser(username: $username email: $email password: $password role: $role) {
          id
          username
          email
          role
          created_at
          updated_at
      }
    }
  `,

  
};

export const postQueries = {
  getPostsQuery: gql`
    query getPosts {
      posts {
        id
        title
        content
        published
        created_at
        updated_at
        user {
          username
          email
        }
        likes {
          postId
          userId
        }
        categories {
          id
          name
        }
        comments {
          content
        }
      }
    }
  `,

  getPostById: gql`
    mutation GetPostById($id: ID!) {
      getPostById(id: $id) {
          id
          title
          content
          created_at
          user {
              username
              email
          }
          categories {
              id
              name
          }
          comments {
              id
              content
              created_at
              user {
                username
              }
              likes {
                postId
                userId
              }
              response {
                  id
                  content
                  created_at
                  user {
                    username
                  }
              }
          }
          
      }
  }
  `,

  getUserLikes: gql`
    mutation GetUserLikes($userId: ID!) {
      getUserLikes(userId: $userId) {
        id
        postId
        userId
      }
    }
  `,

  addLike: gql`
    mutation AddLike($postId: ID!, $userId: ID!) {
      addLike(postId: $postId, userId: $userId) {
        id
        postId
        userId
      }
    }
  `,

  removeLike: gql`
    mutation RemoveLike($postId: ID! $userId: ID!) {
      removeLike(postId: $postId userId: $userId) {
        id
        postId
        userId
      }
    }
  `
}