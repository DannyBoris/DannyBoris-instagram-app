import React, { Component } from 'react';
import axios from 'axios'

class Profile extends Component {

    async componentDidMount (){
        if(this.props.currUser){
            let followers = await axios.get('http://localhost:3003/api/users/:id/followers' ,{headers:{Authorization:'Bearer ' + localStorage.getItem('token')}})
            console.log(followers)
        }
        
    }
    state = {  }
    render() { 

        return ( 
            <div className="profile">
        <h1>{this.props.currUser}</h1>

                <h1>Im a profile</h1>
            </div>
         );
    }
}
 
export default Profile;