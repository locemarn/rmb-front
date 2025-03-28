'use client'

import { graphqlRequests } from "@/app/api/actions";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IPost } from "@/app/utils/types";
import SkeletonComponent from "@/components/Skeleton";
import { User } from "@/store/global/global.types";
import { useAppContext } from "@/store/global/global.provider";


export default function Post() {
  const { user } = useAppContext()
  const params = useParams<{ id: string }>()
  const [post, setPost] = useState<IPost | null>(null)
  const { mutate: getPostByIdMutation, isPending: getPostByIdPending, error: errorGetPostById } = useMutation<{ getPostById: IPost }, Error, number>({
    mutationKey: ['getPostById'],
    mutationFn: async (id: number) => await graphqlRequests.getPostById(id),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: (data) => {
      // Refetch users after a successful delete
      setPost(data.getPostById)
      console.log(data.getPostById)
    },
    onError: (error) => {
      console.log(error);
    }
  })

  useEffect(() => {
    getPostByIdMutation(+params.id)
    console.log(user)
  }, [getPostByIdMutation, params.id, user])

  if (getPostByIdPending) return <SkeletonComponent />
  if (errorGetPostById) return <div>Error</div> 

  return (
    <>
      <div className="box">
        <h1 className="title is-size-2">{post?.title}</h1>
        <p className="is-6 mb-5 has-text-info-light">By: {post?.user.username}</p>
        <p className="subtitle is-5">{post?.content}</p>  
        <p>
          {post?.categories.map((category) => <span key={category.id} className="has-text-info ml-2 hashtags">#{category.name}</span>)}
        </p>
      </div>

      {post?.comments.map((comment) => (
        <div key={comment.id}>
            <div className="box mb-3 has-background-grey-darker mt-4">
              <p>{comment.content}</p>
              <p className="is-size-6 column is-3 is-offset-9">
                By: {comment.user.username} -
                 <time className="is-size-7 ml-1" dateTime={comment.created_at ?? ''}>{new Intl.DateTimeFormat('en-US').format(parseInt(comment.created_at ?? '0'))}</time>
              </p>
            </div>
          {comment.response.map((response: {
            created_at: string;
            user: User; id: string; content: string 
}) => (
            <div key={response.id} className="columns mb-0">
              <div className="column is-11 is-offset-1">
                <div  className="box mb-3 has-background-grey-dark container">
                  <p>{response.content}</p>
                  <p className="is-size-6 column is-3 is-offset-9">
                    By: {response.user.username} - 
                     <time className="is-size-7 ml-1" dateTime={response.created_at ?? ''}>{new Intl.DateTimeFormat('en-US').format(parseInt(response.created_at ?? '0'))}</time>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}