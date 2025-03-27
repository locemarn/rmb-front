import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './postcard.css'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { IPost } from '@/app/utils/types'

export default function PostCard({post}: {post: IPost}) {
  console.log(post)
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
                  <FontAwesomeIcon style={{}} icon={faHeart}></FontAwesomeIcon>
                </span>
              </button>
              <button className="button mr-3">
                <span className="icon is-small">
                  <FontAwesomeIcon style={{}} icon={faComment}></FontAwesomeIcon>
                </span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}