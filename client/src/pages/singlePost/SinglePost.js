import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Rightbar from '../../components/rightbar/Rightbar'
import Topbar from '../../components/topbar/Topbar'
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import './singlePost.css'
import axios from 'axios';
import moment from 'moment'
import { useGlobalContext } from '../../context/AuthContext'

const SinglePost = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user: currentUser} = useGlobalContext()
    const postId = useParams().postid
    console.log(postId)

    const [currentPost, setCurrentPost] = useState(null)
    const [updateMode, setUpdateMode] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts/${postId}`)
                setCurrentPost(res.data)
                setTitle(res.data.title)
                setDesc(res.data.desc)
            } catch (err) {
                console.log(err)
            }
        }

        fetchSinglePost()
    },[postId])

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8800/api/posts/delete/${postId}`, {data: {userId:currentUser._id}})
            window.location.replace('/')
        } catch (err) {
            console.log(err)
        }
    }

    // handling updating
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8800/api/posts/update/${postId}`, {userId: currentUser._id,title, desc})
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
        <Topbar />
        <div className='singlePostSection'>
            <div className="singlePostWrapper">
                <div className="singlePostLeft">
                    <div className="singlePostLeftImageContainer">
                        <img src={currentPost?.postPicture ? PF+currentPost.postPicture : `${PF}nopostpicture.jpg`} alt="" className="singlePostLeftImage" />
                    </div>

                    {/* singlePost title */}
                    {updateMode ? <input type="text" className="singlePostUpdateInput" value={title} onChange={(e) => setTitle(e.target.value)}  /> : (
                    <div className="singlePostTitleContainer">
                        <div className="singlePostTitle">{currentPost?.title}</div>
                        {
                            currentUser._id === currentPost?.userId ? 
                            <div className="singlePostButtons">
                                <EditSharpIcon className='singlePostEditIcon' onClick={() => setUpdateMode(!updateMode)} />
                                <DeleteIcon className='singlePostDeleteIcon' onClick={handleDelete} />
                        </div>
                        : null
                        }
                        
                    </div>
                    ) }

                    {/* singlepost info */}
                    <div className="singlePostInfo">
                    <Link to={`/profile/${currentPost?.userId}`}>
                        <p className="singlePostName"><span className="singlePostNameSpan">Author:</span>{currentPost?.author}</p>
                    </Link>

                        <p className="singlePostDate">{moment(currentPost?.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                    </div>

                    {/* singlepost description */}
                    <div className="singlePostUpdateDesc">
                    {updateMode ? <textarea  className="singlePostUpdateTextarea" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea> : ( 
                    <div className="singlePostDescription">
                        <p className="singlePostDesc">{currentPost?.desc}</p>
                    </div>
                    )}
                    {updateMode ? <button className="singlePostUpdateButton" onClick={handleUpdate}>Update</button> : null}

                    </div>
                </div>
                <div className="singlePostRight">
                    <Rightbar />
                </div>
            </div>
        </div>
        </>
    )
}

export default SinglePost
