import React, { createContext, Component } from 'react';

const AuthConext = createContext()

class AuthContextProvider extends Component {
    state = { 
        currUser:null
     }
    render() { 
        return ( 
           <AuthConext.Provider value={this.state.currUser}>
               {this.props.children}
           </AuthConext.Provider>
         );
    }
}
 
export default AuthContextProvider;