import { GraphQLClient } from "graphql-request";
import { postQueries, userQueries } from "./graphql/queries";
import { User } from "@/store/global/global.types";
import { IPost } from "@/app/utils/types";

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

  getPostById: async (id: number): Promise<{ getPostById: IPost }> => {
    try {
      return await client.request(postQueries.getPostById, { id });
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },

  getUserLikes: async (userId: number): Promise<{ getUserLikes: { id: number; postId: number; userId: number }[] }> => {
    try {
      return await client.request(postQueries.getUserLikes, { userId });
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },

  handleAddLike: async (userId: number, postId: number) => {
    try {
      return await client.request(postQueries.addLike, { userId, postId });
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },

  handleRemoveLike: async (postId: number, userId: number) => {
    try {
      return await client.request(postQueries.removeLike, { postId, userId });
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },
};
