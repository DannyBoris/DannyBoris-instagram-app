import React, { useState, useContext, useRef, useEffect } from 'react';
import { FormContext } from '../../contexts/FormContext';
import { AuthContext } from '../../contexts/AuthContext';
import './form-styles.css'
import axios from 'axios'
import { useHistory } from 'react-router';

const Form = (props) => {

    const [form, setForm] = useState({name:'Danny',email:'',password:'123456'})
    const [transition,setTransition] = useState({
        opacity:0,
        transition: 'all 1s ease'
    })
    const [isValid, setisValid] = useState(false)
    const {showForm, formType ,toggleShowForm} = useContext(FormContext)
    const { updateActiveUser } = useContext(AuthContext)
    let history = useHistory()

    const handleChange = (e) =>{
        let inputField = e.target.id
        let input = e.target.value
        setForm({...form, [inputField]:input})
        
    }
    const validateForm = async () =>{
        //Put any form client validation before it goes back
        let isValidForm = form.name.length >= 6 && 
        form.email.split('').includes('a') && 
        form.password.length > 8
        setisValid(isValidForm)
        setisValid(isValidForm)
    }
    const handleSubmit = async e =>{// TODO:  Move this function to AuthContext --> all auth related issues should go there
        e.preventDefault()
        
        let res = await axios.post(`http://localhost:3003/api/${formType}`, form) 
        let TOKEN = res.data
        console.log(TOKEN)
        if(res.status === 200 || res.status === 201){
            toggleShowForm(false)
            props.activateBlackScreen()
            let tokenInfo = JSON.parse(window.atob(TOKEN.split('.')[1]))
            localStorage.setItem('token',TOKEN)
            localStorage.setItem('currActiveUser',JSON.stringify(tokenInfo.user))
            updateActiveUser(tokenInfo.user)
            history.push('/profile')
        }
    
        
    }
    return  showForm ? ( 
        <form  className={`form`}>
            <div className="input-controls">
                <label>Name</label>
                <input onChange={handleChange}  value={form.name} id='name'  type="text"/>
            </div>
            {formType === 'signup' ? 
              <div className="input-controls">
              <label>Email</label>
              <input onChange={handleChange} value={form.email}   id='email'  type="text"/>
          </div>: ''}
            <div className="input-controls">
                <label>Password</label>
                <input onChange={handleChange} value={form.password}   id='password'  type="text"/>
            </div>
            <button onClick={handleSubmit} className='btn' >Submit</button>     
        </form>
     ): null;
}
 
export default Form;