import React, { createContext, Component } from 'react';

export const AuthContext = createContext()

class AuthContextProvider extends Component {
    state = { 
        currUser:'boris'
     }
     updateActiveUser = (user) => {
        this.setState({
            currUser:user
        })
     }
    render() { 
        return ( 
           <AuthContext.Provider value={{...this.state, updateActiveUser: this.updateActiveUser} }>
               {this.props.children}
           </AuthContext.Provider>
         );
    }
}
 
export default AuthContextProvider;