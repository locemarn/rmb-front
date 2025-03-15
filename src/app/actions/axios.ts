/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const backendUrl = process.env.BACKEND_URL || "";
const loginUrl = process.env.BACKEND_URL_LOGIN || "";

export const axiosRequest = {
  get: async () => {
    try {
      const res = await axios.get(`${backendUrl}/users`);
      return { res, error: false };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { error: true, message: error.response.data.message };
      } else {
        return { error: true, message: error };
      }
    }
  },

  post: async (data: any) => {
    try {
      return await axios.post(loginUrl, { ...data });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { error: true, message: error.response.data.message };
      } else {
        return { error: true, message: error };
      }
    }
  },
};
