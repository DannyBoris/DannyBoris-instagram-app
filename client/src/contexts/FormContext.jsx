import React, { createContext } from 'react';
import { useState } from 'react';

export const FormContext = createContext()

const  FormContextProvider = (props) => {
    
    const [showForm, setShowForm] = useState(false)
    const [formType, setFormType] = useState(null)

    const toggleShowForm = () =>{
        setShowForm(!showForm)
    }
    const toggleFormType = (type) => setFormType(type)

        return ( 
           <FormContext.Provider value={{showForm, formType, toggleShowForm, toggleFormType}}>
               {props.children}
           </FormContext.Provider>
         );
    }
 
export default FormContextProvider;
