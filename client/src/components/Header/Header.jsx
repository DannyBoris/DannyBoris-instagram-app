import React, { useContext, Fragment } from 'react';
import Logo from './main-logo.png'
import { Link, useHistory, Redirect } from 'react-router-dom'

import '../../helpers.css'
import './header.css'
import { FormContext } from '../../contexts/FormContext';
import { AuthContext } from '../../contexts/AuthContext';


const Header = (props) => {
    let history = useHistory()
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

    const  dispatchLogout = async () =>{
        let res = await logout()
        localStorage.clear()
    }
    const  {formType, showForm, toggleShowForm,toggleFormType}  = useContext(FormContext)
    const {currActiveUser ,logout}   = useContext(AuthContext)
    console.log('from header',currActiveUser)
    return   ( 
        <div className="header flex align-center">

            <div className="logo">
               <img src={Logo} alt=""/>
            </div>
            <ul className="links flex">

                {!currActiveUser ?
                  <li className="register-section">
                    <button id="login" onClick={log} className="login-btn btn">Login</button>
                    <button id="signup" onClick={log} className="signup-btn btn">SignUp</button>
                </li> :  
                <Fragment>
                    <Link to={`/profile/${currActiveUser}`}>Welcome {currActiveUser.name}</Link>
                    <button onClick={dispatchLogout} className="btn logout-btn">Logout</button>
                </Fragment>}   
            </ul>
        </div>
     );
}
 
export default Header;