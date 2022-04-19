import React from 'react'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import './rightbar.css'
import { useGlobalContext } from '../../context/AuthContext';

const Rightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const {user:currentUser} = useGlobalContext()
    return (
        <div className='rightbarSection'>
            <div className="rightbarTop">
                <div className="rightbarHeading">
                    <hr className="rightbarHR" />
                    <h5 className='rightbarHorizontalHeading'>ABOUT ME</h5>
                    <hr className="rightbarHR" />
                </div>
            </div>

            {/* rightbar center */}
            <div className="rightbarCenter">
                <div className="rightbarProfileContainer">
                    <img src={currentUser.profilePicture ? PF+currentUser.profilePicture : `${PF}noprofilepicture.png`} alt="" className="rightbarProfilePicture" />
                </div>

                <div className="rightbarProfileDesc">{currentUser.desc ? currentUser.desc : "No description available"}</div>

                {/* rightbar categories */}
                <div className="rightbarCategories">
                    <div className="rightbarHeading">
                        <hr className="rightbarHR" />
                        <h5 className='rightbarHorizontalHeading'>CATEGORIES</h5>
                        <hr className="rightbarHR" />
                    </div>
                <ul className="rightbarCategoriesList">
                    <li className="rightbarCategory">Music</li>
                    <li className="rightbarCategory">Sports</li>
                    <li className="rightbarCategory">Life</li>
                    <li className="rightbarCategory">Health</li>
                    <li className="rightbarCategory">Food</li>
                    <li className="rightbarCategory">Day</li>
                </ul>
                </div>  
            </div>

            {/* rightbar bottom */}
            <div className="rightbarBottom">
                <div className="rightbarHeading">
                    <hr className="rightbarHR" />
                    <h5 className='rightbarHorizontalHeading'>FOLLOW US</h5>
                    <hr className="rightbarHR" />
                </div>

                <ul className="rightbarSocialList">
                    <li className="rightbarSocialItem"><InstagramIcon /></li>
                    <li className="rightbarSocialItem"><FacebookIcon /></li>
                    <li className="rightbarSocialItem"><LinkedInIcon /></li>
                    <li className="rightbarSocialItem"><TwitterIcon /></li>
                </ul>
            </div>
        </div>
    )
}

export default Rightbar
