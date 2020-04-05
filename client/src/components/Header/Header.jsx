import React, { useContext } from 'react';
import Logo from './main-logo.png'
import { Link } from 'react-router-dom'

import '../../helpers.css'
import './header.css'
import { FormContext } from '../../contexts/FormContext';
import { AuthContext } from '../../contexts/AuthContext';


const Header = (props) => {
    const log = (e) =>{
        
        let type = e.target.id
        if(!showForm){
            props.activateBlackScreen()
            toggleShowForm()
            toggleFormType(type)
        }
        else if(showForm && (type === formType)){
            toggleShowForm()
            props.activateBlackScreen()
            toggleFormType(null)
        }
        else{
            toggleFormType(type)
        }

    

    }
    console.log(props.location)
    const  {formType, showForm, toggleShowForm,toggleFormType}  = useContext(FormContext)
    const {currActiveUser}   = useContext(AuthContext)
    console.log('from header',currActiveUser)
    return ( 
        <div className="header flex align-center">

            <div className="logo">
               <img src={Logo} alt=""/>
            </div>
            <ul className="links flex">
                <li><a href="#"> <img alt="" src="https://img.icons8.com/material-rounded/24/000000/home.png"/></a></li>
                <li><a href="#"></a><img alt="" src="https://img.icons8.com/android/24/000000/new-message.png"/></li>
                <li><a href="#"><img alt="" src="https://img.icons8.com/android/24/000000/compass.png"/></a></li>
                <li><a href="#"></a><img alt="" src="https://img.icons8.com/pastel-glyph/24/000000/hearts.png"/></li>
                {!currActiveUser ?
                  <li className="register-section">
                    <button id="login" onClick={log} className="login-btn btn">Login</button>
                    <button id="signup" onClick={log} className="signup-btn btn">SignUp</button>
                </li> :  
                <Link to={`/profile/${currActiveUser.user.name}`}>Welcome {currActiveUser.user.name}</Link>}
            </ul>
        </div>
     );
}
 
export default Header;