import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './postcard.css'
import { faHeart, faComment, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { IPost } from '@/app/utils/types'
import Link from 'next/link'
import { useAppContext } from '@/store/global/global.provider'
import { graphqlRequests } from '@/app/api/actions'
import { useEffect, useState, useCallback } from 'react'

export default function PostCard({post}: {post: IPost}) {
  const { user } = useAppContext()

  const [isLiked, setIsLiked] = useState<number[]>([])

  const getUserLikes = useCallback(async () => {
    if (user?.id) {
      const res = await graphqlRequests.getUserLikes(+user.id)
      res.getUserLikes.map((like) => {
        if (like.postId === post.id) {
          setIsLiked(prev => {
            if (!prev.includes(+like.postId)) {
              return [...prev, +like.postId]
            }
            return prev
          })
        }
      })
    }
  }, [user?.id, post.id])

  
  function isLikedPost(postId: number) {
    return isLiked.includes(+postId)
  }
  const handleAddLike = async (postId: number) => {
    if (!user?.id) return
    const res = await graphqlRequests.handleAddLike(user.id, postId)
    console.log(res)
    getUserLikes()
  }

  const handleRemoveLike = async (postId: number) => {
    if (!user?.id) return
    const res = await graphqlRequests.handleRemoveLike(postId, user.id)
    console.log(res)
    if ((res as { removeLike: boolean }).removeLike) {
      setIsLiked(prev => prev.filter(id => +id !== +postId))
    }
    getUserLikes()
  }
    
  useEffect(() => {
    getUserLikes()
  }, [getUserLikes, isLiked, isLikedPost])
  
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{post.title}</p>
        <p className='mt-2 mr-5'>
          Author: <a href={`mailto:${post.user.email}`}>{post.user.username}</a>
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {post.content}
          {post.categories.map((category) => {
            return <span key={category.id} className="has-text-info ml-2 hashtags">#{category.name}</span>
          })}
        </div>
      </div>
      <footer className="card-footer">
        <div className="fixed-grid has-4-cols grid-width">
          <div className="grid">
            <div className="cell ml-3 mt-2">
              <time>{new Intl.DateTimeFormat('en-US').format(parseInt(post.created_at))}</time>
            </div>
            <div className="cell is-col-span-2"></div>
            <div className="cell is-flex is-justify-content-flex-end">
              <button className="button mr-3">
                <span className="icon is-small">
                  {isLikedPost(post.id) ? (
                    <FontAwesomeIcon style={{color: 'red'}} icon={faHeart} onClick={() => handleRemoveLike(post.id)}></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon style={{color: ''}} icon={faHeartBroken} onClick={() => handleAddLike(post.id)}></FontAwesomeIcon>
                  )}
                </span>
              </button>
              <button className="button mr-3">
                <span className="icon is-small">
                  <Link href={`/post/${post.id}`}>
                    <FontAwesomeIcon style={{}} icon={faComment}></FontAwesomeIcon>
                  </Link>
                </span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}