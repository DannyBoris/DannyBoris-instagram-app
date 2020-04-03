import React from 'react';
import {Link, Route} from 'react-router-dom'
import Profile from '../Profile/Profile'
import Logo from './main-logo.png'
import profileThumb from './profile-thmbnail.png'
import '../../helpers.css'
import './header.css'
const Header = () => {
    return ( 
        <div className="header flex align-center">

            <div className="logo">
               <img src={Logo} alt=""/>
            </div>
            <ul className="links flex">
                <li><a href="#"> <img src="https://img.icons8.com/material-rounded/24/000000/home.png"/></a></li>
                <li><a href="#"></a><img src="https://img.icons8.com/android/24/000000/new-message.png"/></li>
                <li><a href="#"><img src="https://img.icons8.com/android/24/000000/compass.png"/></a></li>
                <li><a href="#"></a><img src="https://img.icons8.com/pastel-glyph/24/000000/hearts.png"/></li>
                <li><Link to="/profile"><img className="profile-img" src={profileThumb} alt=""/></Link></li>
            </ul>
        </div>
     );
}
 
export default Header;