import React , {Component} from 'react';
import Header from './components/Header/Header'
import './App.css';
import './helpers.css'
import axios from 'axios'
import Form from './components/Form/Form'
import {  Switch, Route } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import Profile from './components/Profile/Profile'
import AuthContextProvider from './contexts/AuthContext'
import Home from './components/Home/Home';
import ImageContextProvider from './contexts/ImageContext';
import FormContextProvider from './contexts/FormContext';



class App extends Component {
  
async componentDidMount (){
 
  let res = await axios.get('http://localhost:3003/api/users')      
  let data = res.data
  this.setState({
    users:data
  })
}
 Auth
renderUser = () =>this.state.userById ? (<h1>User by id name: {this.state.userById.name}</h1>) : null


  state = { 
    activeBlackScreen:false,
    users:[],
    userById:null,
    currLoggedInUser:'Josh',
    form:{
      show:false,
      type:null
    }
   }
   async getUserById(id) {
    let res = await axios.get(`http://localhost:3003/api/users/${id}`) 
    let data = res.data     
    this.setState({
      userById: data
    })

   }
   activateBlackScreen = ()=>{
     this.setState({
       activeBlackScreen: !this.state.activeBlackScreen
     })
   }
   showForm = (type) =>{
     this.setState({
       showForm: !this.state.showForm,
       type
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
      <div className="App">
     {this.state.activeBlackScreen ?  <div className="black-screen"></div> : ''}
    <Router>
      <FormContextProvider>

      <ImageContextProvider>
      <AuthContextProvider>
      <Header activateBlackScreen={this.activateBlackScreen}/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/profile' component={Profile}/> 
        </Switch>
        <Form activateBlackScreen={this.activateBlackScreen} /> 
      </AuthContextProvider>
      </ImageContextProvider>
      </FormContextProvider>
    </Router>
 
      </div>
 
     );
  }
}



export default App;



