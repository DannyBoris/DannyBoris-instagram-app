import React, { Component } from 'react';
import axios from 'axios'
import {AuthContext} from '../../contexts/AuthContext'

class Profile extends Component {
    static contextType = AuthContext
    async componentDidMount (){
        if(this.props.currUser){
            let followers = await axios.get('http://localhost:3003/api/users/:id/followers' ,{headers:{Authorization:'Bearer ' + localStorage.getItem('token')}})
            console.log(followers)
        }
        
    }
    state = {  }
    render() { 
        console.log(this.context)
        return ( 
                <div className="profile">
                    <h1>{this.context.currUser}</h1>
                    <h1>Im a profile</h1>
                    <button onClick={()=>this.context.updateActiveUser('dima')}>fdsf</button>
                </div>
    
         );
    }
}
 
export default Profile;