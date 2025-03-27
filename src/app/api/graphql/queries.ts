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
}
