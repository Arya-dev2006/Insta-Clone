import React, { useState } from 'react'
import '../styles/form.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [passWord, setpassWord] = useState('');

  function handleSubmit(e){
    e.preventDefault();
  }
  return (
   <main>
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={userName} onChange={(e) => setuserName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={passWord} onChange={(e) => setpassWord(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <h3>Already have an account? <Link to="/login">Login</Link></h3>
    </div>
    
   </main>
  )
}

export default Register
