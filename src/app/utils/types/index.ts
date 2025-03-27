import { User } from "@/store/global/global.types"

/* eslint-disable @typescript-eslint/no-explicit-any */
export type IPost = {
  id: number,
  title: string,
  content: string,
  published: boolean,
  created_at: string,
  updated_at: string,
  user: {
    username: string,
    email: string,
  },
  categories: Array<{
    name: string
    id: number
  }>
}

export type QueryRespose = {
  isLoading: boolean,
  error: any,
  refetch: any
  data: {
    posts: IPost[] | undefined,
  } | undefined
  isFetching: boolean
}

export type IUseQueryRespose = {
  isLoading: boolean,
  error: any,
  refetch: any
  data: {
    users: IUser[] | undefined,
  } | undefined
  isFetching: boolean
}

export type IUser = User & {
  id: number
}

export type FormState =
| {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string;
  }
| undefined;