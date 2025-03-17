import { gql } from "graphql-request";

export const userQueries = {
  getUsersQuery: gql`
    {
      getUsers {
        id
        username
        email
      }
    }
  `,

  deleteUser: gql`
    mutation DeleteUser($id: Int) {
      deleteUser(id: $id) {
        id
        username
        email
        created_at
        updated_at
      }
    }
  `,
};
