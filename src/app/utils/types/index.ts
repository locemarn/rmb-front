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