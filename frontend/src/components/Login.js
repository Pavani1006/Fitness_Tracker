import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLock } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toplogo from './assets/toplogo.jpg'
import './Login.css'

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('https://fitness-tracker-njaz.onrender.com/login',{email,password})
    .then(res=> {
      console.log('login.js',res)
      if (res.status=== 200 && res.data.userId) 
      {
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('username', res.data.username);
        console.log(localStorage.getItem('userId'));
        alert("Login successful!!");
        navigate('/aboutus')
      }
      else if (res.data === 'Password is incorrect')
      {
        alert('Check your password!!');
      }
      else if (res.data === 'No such record exist')
      {
        alert('No such user found!!');
      }
    })
    .catch(err=> console.log(err))
  }
  return (
      <div className="login">
        <div className='logo'>
         <img className='smallogo' src={toplogo} alt='logo'/>
         <p className='logotext'>FITNESS</p>
        </div>
        <div className="logincontainer">
          <form onSubmit={handleSubmit}>
          <p className='head'>Login</p>
          <div className="loginfields">
            <input type='email' placeholder='Email address' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <HiOutlineMail className='emailicon'/>
            <input type='password' placeholder='Your Password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <FiLock className='pswdicon' />
          </div>
          <button className='loginbtn'>Login</button>
          <p className='text'>Create an account ? <Link to='/signup' className='link'><span >Click Here</span></Link></p>  
          </form>
        </div>
        </div>
  )
}

export default Login
