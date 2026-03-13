import React, { useState } from 'react'
import '../styles/form.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {

  const [userName, setuserName] = useState('');
  const [passWord, setpassWord] = useState('');
  function handleSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:3000/api/auth/login',{
      username: userName,
      password: passWord
    },{
      withCredentials: true,
    }).then((res)=>{
      console.log(res.data);
    });
  }
  return (
   <main>
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
        onChange={(e)=>{
          setuserName(e.target.value);
        }}
         type="text" 
         placeholder="Username" 
         value={userName}
         />
        <input 
        onChange={(e)=>{
          setpassWord(e.target.value)
        }} 
        type="password" 
        placeholder="Password" 
        value={passWord}
        />
        <button type="submit">Login</button>
      </form>
      <h3>Don't have an account? <Link to="/register">Sign up</Link></h3>
    </div>
   </main>
  )
}

export default Login
