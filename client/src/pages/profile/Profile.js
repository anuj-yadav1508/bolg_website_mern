import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Rightbar from '../../components/rightbar/Rightbar'
import Topbar from '../../components/topbar/Topbar'
import Post from '../../components/post/Post'
import './profile.css'

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const authorId = useParams().userid

    const [userPost, setUserPost] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts/all/${authorId}`)
                setUserPost(res.data)
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchUserPosts()
    },[authorId])

    // getting user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/users/find?userId=${authorId}`)
                setUser(res.data)
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchUser()
    },[authorId])
    return (
        <>
        <Topbar />
        <div className='profileSection'>
            <div className="profileWrapper">
                <div className="profileLeft">
                    <div className="profileLeftWrapper">

                        {/* profile badge */}
                        <div className="profileBadge">
                            <div className="profileLeftPictureContainer">
                                <img src={user?.profilePicture ? PF+user?.profilePicture : `${PF}noprofilepicture.png`} alt="" className="profileImage" />
                            </div>

                            <div className="profileBadgeInfo">
                                <p className="profileUsername">{user?.name}</p>
                                <p className="profileDesc">{user?.desc ? user?.desc : 'No description available'}</p>
                            </div>
                        </div>

                        <div className="profileLeftHeading">
                            <h3 className="profileHeading"><span className="profileHeadingSpan">All Posts by :</span> {user?.name}</h3>
                            <div className="profileUnderline"></div>
                        </div>


                        {/* profileleft posts wrapper */}
                        <div className="profilePostWrapper">
                            {
                            userPost.map((post) => {
                                return (
                                    
                                        <Link to={`/singlepost/${post._id}`}>
                                            <div style={{textDecoration:'none'}}>
                                        <Post key={post._id} post={post} />
                                        </div>
                                        </Link>
                                    
                                )
                            })
                        }
                        </div>
                        
                    </div>
                </div>
                <div className="profileRight">
                    <Rightbar />
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile
