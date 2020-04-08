import React, { Component, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './profile.css'
import { useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Home from '../Home/Home'


const Profile = (props) => {

    useEffect(()=>{
        fetchUsers()
    },[])
    
    const fetchUsers = async () =>{
        let res = await axios.get(`http://localhost:3003/api/users/${currActiveUser.id}/following`)
        let users = res.data[0].followerObjs
        setUsers(users)
    }
    const {currActiveUser} = useContext(AuthContext)
    console.log(currActiveUser)
    const [users,setUsers] = useState()

      
    
    const renderImg=()=>{
       return users.map(user=>user.imgObjs.map(img=>{
           return <div className="card-item">
               <div className="profile-header">
                <img className="profile-image" src={user.profileImg} alt=""/>
                <p>{user.name}</p>
               </div>
                <div className="image-container">
                   <h2>{img.title}</h2>
                   <img src={img.url}/>
                </div>
           </div>
        }))
    }
    
        return  currActiveUser ?  
             (<div className="profile">
                {users ? renderImg() : <h1>LODAING</h1>}  
            </div>)
          :
          (<Redirect to={Home}/>)
        }
    
export default Profile;