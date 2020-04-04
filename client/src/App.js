import React , {Component} from 'react';
import Header from './components/Header/Header'
import './App.css';
import axios from 'axios'
import Form from './components/Form/Form'
import {  Switch, Route } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import Profile from './components/Profile/Profile'
import AuthContextProvider from './contexts/AuthContext'



class App extends Component {
  
async componentDidMount (){

  let res = await axios.get('http://localhost:3003/api/users')      
  let data = res.data
  this.setState({
    users:data
  })
}
 
renderUser = () =>this.state.userById ? (<h1>User by id name: {this.state.userById.name}</h1>) : null


  state = { 
    users:[],
    userById:null,
    currLoggedInUser:'Josh'
   }
   async getUserById(id) {
    let res = await axios.get(`http://localhost:3003/api/users/${id}`) 
    let data = res.data     
    this.setState({
      userById: data
    })

   }

    getUserByIdWithImages  = async id => {
    let res = await axios.get(`http://localhost:3003/api/users/${id}/images`) 
    let data = res.data
    
      
    }

    updateLoggedUser = (loggedUser) =>{
      console.log('This is a call from the child compoentns: ' + loggedUser)
      this.setState({
        currLoggedInUser:loggedUser
      })
  }
  render() { 

    return ( 
      <AuthContextProvider>
      <div className="App">
             <Router>
      <Header/>
        <Switch>
        <Route path='/profile' render={(props)=> <Profile 
              currUser={this.state.currLoggedInUser}/> }/>
            <Route path='/form' render={(props)=> <Form 
              updateLoggedUser={this.updateLoggedUser}
              currUser={this.state.currLoggedInUser}/> }/>
        </Switch>
        <button onClick={()=>this.getUserByIdWithImages('5e86216947d8db4d9880ba9b')}>CLICKME</button>
      </Router>
      </div>
      </AuthContextProvider>
 
     );
  }
}

/** */


export default App;



