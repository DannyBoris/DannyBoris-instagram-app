import React, { Component, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext()

class UserContextProvider extends Component {

     queryUser = async () =>{
        let res = await axios.get('http://localhost:3003/api/users')
        let users = res.data
        this.setState({
            users
        })
    }
    state = { 
        users:[],
        currActiveUser:null
     }
    render() { 
        return ( 
            <UserContext.Provider value={{...this.state}}>
                {this.props.children}
            </UserContext.Provider> 
         );
    }
}
 
export default UserContextProvider;