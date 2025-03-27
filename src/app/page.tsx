/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import PostCard from "@/components/PostCard";
import { graphqlRequests } from "./api/actions";
import { useQuery } from "@tanstack/react-query";

import SkeletonComponent from "@/components/Skeleton";
import { useEffect, useState } from "react";
import { IPost, QueryRespose } from "./utils/types";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([])

  const { isLoading: isLoadingGetAllPosts, error: errorGetAllPosts, data: dataGetAllPosts }: QueryRespose = useQuery({
    queryKey: ['getPosts'],
    queryFn: async () => await graphqlRequests.getAllPosts(),
  })

  
  useEffect(() => {
    if (dataGetAllPosts) setPosts(dataGetAllPosts.posts as IPost[])
  }, [dataGetAllPosts])
  
  if (isLoadingGetAllPosts) return <SkeletonComponent />
  if (errorGetAllPosts) return <div>Error</div> // TODO: handle 404 page
  return (
    <>
      <section className="container is-max-desktop">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </section>
    </>
  );
}
