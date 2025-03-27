import { GraphQLClient } from "graphql-request";
import { postQueries, userQueries } from "./graphql/queries";
import { User } from "@/store/global/global.types";

const endpoint = `${process.env.GRAPHQL_URL}`;
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
      console.error(error);
      throw new Error("error on deleteUser");
    }
  },

  registerUser: async (user: User) => {
    try {
      console.log("akiiii", client);
      const result = await client.request(
        userQueries.registerUserMutation,
        user
      );

      return result;
    } catch (error) {
      console.error("error on registerUser ----->", error);
      // throw new Error("error on registerUser");
      throw new Error(JSON.stringify(error));
    }
  },

  getAllPosts: async () => {
    try {
      return await client.request(postQueries.getPostsQuery);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },
};
