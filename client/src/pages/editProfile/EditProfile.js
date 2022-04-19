import React, { useState } from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Topbar from '../../components/topbar/Topbar'
import UpdateIcon from '@material-ui/icons/Update';
import './editProfile.css'
import { useGlobalContext } from '../../context/AuthContext';
import axios from 'axios';

const EditProfile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user: currentUser} = useGlobalContext()

    const [username, setUsername] = useState(currentUser.username)
    const [email, setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState(currentUser.password)
    const [file, setFile] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()

        const newProfile = {
            username,
            email,
            password
        }

        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('name', filename)
            data.append('file', file)
            newProfile.profilePicture = filename

            try {
                await axios.post('/upload', data)
            } catch (err) {
                console.log(err)
            }
        }

        try {
            const res = await axios.put(`/users/update/${currentUser._id}`, newProfile)
            localStorage.setItem('user', JSON.stringify(res.data))
            window.location.reload()
            setSuccess(true)
        } catch (err) {
            console.log(err)
        }
    }

console.log(file)

    return (
        <>
        <Topbar />
        <div className='editProfileSection'>
            <div className="editProfileWrapper">
                <div className="editProfileLeft">
                    <div className="editProfileLeftWrapper">
                        {/* edit profile heading */}
                        <div className="editProfileHeading">
                            <h1 className="editProfileUpdateHeading">Update Your Profile</h1>
                            <h4 className="editProfileDelete">Delete Profile</h4>
                        </div>

                        {/* editProfile form */}
                        <form className="editProfileForm" onSubmit={handleUpdateSubmit}>

                            {/* editform top */}
                            <div className="editProfileFormTop">
                                <div className="editProfilePictureContainer">
                                    <img src={file ? URL.createObjectURL(file): PF+currentUser.profilePicture} alt="" className="editProfilePicture" />
                                </div>
                                  
                                <div className="editProfileUpdateProfilePicture">
                                    <label htmlFor="file" className="updateProfilePictureLabel"><UpdateIcon className='updateIcon' /></label>
                                    <input type="file" id='file'  className="updateProfilePictureInput" style={{display:'none'}} onChange={(e) => setFile(e.target.files[0])} />
                                </div>
                            </div>

                            {/* editform center */}
                            <div className="editProfileFormCenter">
                                <label  className="editProfileCenterLabel">Username</label>
                                <br />
                                <input type="text" className="editProfileCenterInput" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <br />

                                <label  className="editProfileCenterLabel">Email</label>
                                <br />
                                <input type="email" className="editProfileCenterInput" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <br />

                                <label  className="editProfileCenterLabel">Password</label>
                                <br />
                                <input type="password" className="editProfileCenterInput" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <br />

                            </div>

                            {/* editprofile bottom */}
                            <div className="editProfileBottom">
                                <button className="editProfileUpdateButton" type='submit'>Update</button>
                            </div>
                        </form>
                        {success ? <p className="successUpdatePara">Profile updated successfully !</p>: null  }
                    </div>
                </div>
                <div className="editProfileRight">
                    <Rightbar />
                </div>
            </div>
        </div>
        </>
    )
}

export default EditProfile
