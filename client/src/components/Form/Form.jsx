import React, { useState, useContext } from 'react';
import { FormContext } from '../../contexts/FormContext';
import { AuthContext } from '../../contexts/AuthContext';
import './form-styles.css'
import axios from 'axios'

const Form = (props) => {

    const [form, setForm] = useState({name:'',email:'',password:''})
    const [isValid, setisValid] = useState(false)
    const {showForm, formType ,toggleShowForm} = useContext(FormContext)
    const { updateActiveUser } = useContext(AuthContext)


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
    const handleSubmit = async e =>{
        e.preventDefault()
        
        let res = await axios.post(`http://localhost:3003/api/${formType}`, form)
        let data = res.data
        if(res.status === 200 || res.status === 201){
            console.log('EVERYTHING WORKDSSSS')
            toggleShowForm(false)
            props.activateBlackScreen()
            let userFromToken = JSON.parse(window.atob(data.split('.')[1]))
            localStorage.setItem('token',data)
            updateActiveUser(userFromToken)
        }
    
        
    }
    return ( 
        <form  className={`form ${showForm ? 'show' : 'hide'}`}>
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
            <span className={`${isValid ? 'hide' : 'show'}`}>Not valid</span>
            <button onClick={handleSubmit} className='btn' >Submit</button>     
        </form>
     );
}
 
export default Form;