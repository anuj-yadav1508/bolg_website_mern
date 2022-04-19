import React, { useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Rightbar from '../../components/rightbar/Rightbar'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './writePost.css'
import { useGlobalContext } from '../../context/AuthContext';
import axios from 'axios';

const WritePost = () => {
    
    const {user: currentUser} = useGlobalContext()
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPost = {
            author: currentUser.name,
            title,
            desc,
            userId: currentUser._id
        }

        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('name', filename)
            data.append('file', file)
            newPost.postPicture = filename

            try {
                await axios.post('/upload', data)
            } catch (err) {
                console.log(err)
            }
        }

        try {
            const res = await axios.post('/posts/create', newPost)
            window.location.replace(`/singlepost/${res.data._id}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
        <Topbar />
        <div className='writePostSection'>
            <div className="writePostWrapper">
                <div className="writePostLeft">
                    <div className="writePostLeftWrapper">
                        {file && <div className="writePostImageContainer">
                            <img src={URL.createObjectURL(file)} alt="" className="writePostImage" />
                        </div>}

                        {/* WritePost form starting */}
                        <form className="writePostForm" onSubmit={handleSubmit} >
                            <div className="writePostFormTop">
                                <label htmlFor="file" className='writePostFileLabel'><AddCircleOutlineIcon className='writePostAddIcon' /></label>
                                <input type="file" id='file' style={{display:'none'}} onChange={(e) => setFile(e.target.files[0])} />
                                <input type="text" placeholder='Your Title...' className="writePostStoryTitleInput" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div className="writePostFormBottom">
                                <textarea placeholder='Your Story....' className="writePostTextarea" value={desc} onChange={(e) => setDesc(e.target.value)} ></textarea>
                                <button className="writePostSubmitButton" type='submit'>Publish</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <div className="writePostRight">
                    <Rightbar />
                </div>
            </div>
        </div>
        </>
    )
}

export default WritePost
