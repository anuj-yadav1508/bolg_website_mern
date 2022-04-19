import React from 'react'
import { Search } from '@material-ui/icons'
import { useHistory, Link } from 'react-router-dom'
import './topbar.css'
import { useGlobalContext } from '../../context/AuthContext'

const Topbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const history = useHistory()

    const {user: currentUser} = useGlobalContext()

    const handleLogout = () => {
        localStorage.removeItem('user')
        history.push('/login')
        window.location.reload()
    }
    return (
        <nav className='topbarSection'>
            <div className="topbarLeft">
                <div className="topbarHeading">DAILY-BLOG</div>
            </div>
            <div className="topbarCenter">
                <ul className="linksList">
                    <Link to='/'>
                    <li className="linkItem" style={{textDecoration:'none'}}>HOME</li>
                    </Link>
                  
                    <li className="linkItem">ABOUT</li>
             
        
                    <li className="linkItem">CONTACT</li>
                    <Link to='/writepost'>
                    <li className="linkItem">WRITE</li>
                    </Link>

                    <li className="linkItem" onClick={handleLogout}>LOGOUT</li>
                </ul>
            </div>
            <div className="topbarRight">
                <div className="topbarSearch">
                    <Search className='topbarSearchIcon' />
                    <input type="text" className="topbarSearchInput" placeholder='Search' />
                </div>
                {currentUser ? 
                <Link to='/editprofile'>
                <div className="topbarProfileContainer">
                    <img src={currentUser.profilePicture ? PF+currentUser.profilePicture : `${PF}noprofilepicture.png`} alt="" className="topbarProfilePicture" />
                </div>
                </Link>
                :
                <ul className="linksList">
                    <Link to='/login'>
                    <li className="linkItem" style={{textDecoration:'none'}}>LOGIN</li>
                    </Link>
                  
                    
             
        
                    
                    <Link to='/register'>
                    <li className="linkItem">REGISTER</li>
                    </Link>


                </ul>
                }
            </div>
        </nav>
    )
}

export default Topbar
