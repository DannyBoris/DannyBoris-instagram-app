import React, { createContext, Component } from 'react';

export const AuthContext = createContext()

class AuthContextProvider extends Component {
    state = { 
        currActiveUser:null
     }
     updateActiveUser = (user) => {
        this.setState({
            currActiveUser:user
        })
        console.log(this.state.currActiveUser)
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