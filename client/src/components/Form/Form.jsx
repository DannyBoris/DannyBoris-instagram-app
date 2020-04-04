import React, { Component } from 'react';
import './form-styles.css'
import axios from 'axios'
class Form extends Component {
    state = { 
        form:{
            name:'Anna',
            email:'annaber@gmail.com',
            password:'dudidudi'
        },
         errMsg:null,
         currUser:this.props.currUser

     }

    handleChange = e =>{
       let fieldName = e.target.id
       let input = e.target.value
        this.setState(prevState => ({
            form: {                 
                ...prevState.form,    
                [fieldName]: input       
            }
        }))
     }
    handleSignUp = async e => {
        e.preventDefault()
        console.log(this.props)
        let { name } = this.state.form
        let res = await axios.post('http://localhost:3003/api/signup',this.state.form)
        let { msg, code } = res.data
        //If failed to sign in
        if(code === 400 || code === 500) this.setState({errMsg:msg})
        //Sign in went a o k! 
        else{
            this.setState({
                currUser:name
                })
                this.props.history.push('/profile')
                
            }
            
            
        }

    
        handleLogin = async e =>{
        e.preventDefault()
        let {name} = this.state.form
        let res = await axios.post('http:///localhost:3003/api/login',this.state.form)
        let data = res.data
        console.log(data)
        if(data){
            console.log(data)
            localStorage.setItem('token',data)
            this.props.updateLoggedUser(name)
        }
        
        
    }
    render() { 
        return ( 
            <form  className="form">
                <div className="input-controls">
                    <label>Name</label>
                    <input onChange={this.handleChange} id='name' value={this.state.form.name} type="text"/>
                </div>

                <div className="input-controls">
                    <label>Email</label>
                    <input onChange={this.handleChange} id='email' value={this.state.form.email} type="text"/>
                </div>

                <div className="input-controls">
                    <label>Password</label>
                    <input onChange={this.handleChange} id='password' value={this.state.form.password} type="text"/>
                </div>
                    <span>{this.state.errMsg}</span>
                <button onClick={this.handleLogin}>Submit</button>
            </form>
         );
    }
}
 
export default Form;