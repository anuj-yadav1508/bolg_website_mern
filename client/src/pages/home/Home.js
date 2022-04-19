import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../../components/topbar/Topbar'
import Rightbar from '../../components/rightbar/Rightbar'
import './home.css'
import Post from '../../components/post/Post'
import axios from 'axios'

const Home = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('posts/all/timeline')
                console.log(res.data)
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchPosts()
    },[])
    return (
        <>
        <Topbar />
        <section className='homeSection'>
            <div className="homeImageContainer">
                        <img src={`${PF}post/post_7.jpg`} alt="" className="homeImage" />
                    </div>
            <div className="homeWrapper">
                <div className="homeLeft">
                    <div className="homeLeftWrapper">
                        {
                            posts.map((post) => {
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
                <div className="homeRight">
                    <Rightbar />
                </div>
            </div>
        </section>
        </>
    )
}

export default Home
