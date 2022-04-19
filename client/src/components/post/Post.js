import React from 'react'
import moment from 'moment'
import './post.css'

const Post = ({post}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className='postSection'>
            <div className="postImageContainer">
                <img src={post.postPicture ? PF+post.postPicture : `${PF}nopostpicture.jpg`} alt="" className="postImage" />
            </div>

            <div className="postTitle" style={{textDecoration:'none', color:'black'}}>{post.title}</div>

            <div className="postDate">{moment(post.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>

            <div className="postDesc">
                {post.desc?.slice(0,100)}
            </div>
        </div>
    )
}

export default Post
