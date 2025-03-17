import { GraphQLClient } from "graphql-request";
import { userQueries } from "./graphql/queries";

const endpoint = `${process.env.BACKEND_URL}/users`;
const client = new GraphQLClient(endpoint);

export const graphqlRequests = {
  getAllUsers: async () => {
    return await client.request(userQueries.getUsersQuery);
  },

  deleteUser: async (id: number) => {
    try {
      const result = await client.request(userQueries.deleteUser, { id });
      return result;
    } catch (error) {
      return error;
    }
  },
};
