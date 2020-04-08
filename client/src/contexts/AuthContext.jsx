import axios from 'axios'
import React, { createContext, Component } from 'react';

export const AuthContext = createContext()

class AuthContextProvider extends Component {
    state = { 
        currActiveUser: null || JSON.parse(localStorage.getItem('currActiveUser')) 
     }
     updateActiveUser = (user) => {
        this.setState({
            currActiveUser:user
        })
        console.log(this.state.currActiveUser)
     }
     logOut = async () =>{
        let user = await axios.get(`http://localhost:3003/api/users/${this.state.currActiveUser.id}`)
        if(user)  this.setState({
            currActiveUser:null
        })
        return user && true
            
        

     }
    render() { 
        return ( 
           <AuthContext.Provider value={{...this.state, updateActiveUser: this.updateActiveUser, logout:this.logOut} }>
               {this.props.children}
           </AuthContext.Provider>
         );
    }
}
 
export default AuthContextProvider;