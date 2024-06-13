import React, { useEffect, useState } from 'react';
import { loginUser } from '../api/api';

const Login = () => {
    const [formData,setFormData] = useState({email:"",password:""});
    const [token,setToken] = useState("");
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
   
    const handleSubmit = async (e)=>{
       e.preventDefault();
       try {
        const authToken = await loginUser(formData);
        setToken(authToken);
        console.log('Login successful. Token:', authToken);
    } catch (error) {
        console.error('Error logging in:', error);
    }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' placeholder='Email' onChange={(e)=>handleChange(e)}/>
        <input type="password" name='password' placeholder='Password' onChange={(e)=>handleChange(e)}/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
