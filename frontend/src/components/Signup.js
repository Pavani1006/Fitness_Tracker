// import React, { useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import { FaRegUser } from "react-icons/fa6";
// import { FiLock } from "react-icons/fi";
// import { HiOutlineMail } from "react-icons/hi";
// import { useNavigate } from 'react-router-dom';
// import toplogo from './assets/toplogo.jpg'
// import './Signup.css'

// const Signup = () => {
//   const [name,setName] = useState('')
//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleSubmit=(e)=>{
//     e.preventDefault()
//     axios.post('https://fitness-tracker-njaz.onrender.com/signup', {name,email,password})
//     .then(res => {
//       console.log('signup.js',res)
//       if (res.data === 'Exists'){
//         alert("User already exists with same email! Try to login or Create an account using another email")
//       }
//       else if(res.status=== 200 && res.data.userId) {
//         localStorage.setItem('userId', res.data.userId);
//         localStorage.setItem('username', res.data.username);
//         console.log(localStorage.getItem("ll",'userId'));
//         alert("Account successfully created!!")
//         navigate('/aboutus')
//       }
//       else {
//         alert("Error")
//       }
//     })
//     .catch(err =>{
//       alert("Error")
//      console.log('axios err ',err)
//     })
//   }

//   return (
//     <div>
//     <div className="signup">
//       <div className='logo'>
//        <img  className='smallogo' src={toplogo} alt='logo'/>
//        <p className='logotext'>FITNESS</p>
//       </div>
//       <div className="signupcontainer">
//       <form onSubmit={handleSubmit}>
//         <p className='head'>Sign Up</p>
//         <div className="signupfields">
//           <input type='text' placeholder='Your Name' name='name' value={name} onChange={(e)=>setName(e.target.value)} required/>
//           <FaRegUser className='usericon' />
//           <input type='email' placeholder='Email address' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  required/>
//           <HiOutlineMail className='emicon'/>
//           <input type='password' placeholder='Your Password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
//           <FiLock className='pwdicon' />
//         </div>
//         {/* <Link to='/navbar'> */}
//         <button className='signupbtn'>Sign Up</button>
//         {/* </Link> */}
//         <p className='text'>Already have an account ? <Link to='/login' className='link'><span >Login Here</span></Link></p>
//         </form>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Signup





import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import toplogo from './assets/toplogo.jpg';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://fitness-tracker-njaz.onrender.com/signup', { name, email, password })
      .then(res => {
        console.log('signup.js', res);
        if (res.data === 'Exists') {
          alert("User already exists with the same email! Try to login or create an account using another email.");
        } else if (res.status === 200 && res.data.token) {
          // Store token and user information in localStorage
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('username', res.data.username);

          console.log('Signup successful, userId:', localStorage.getItem('userId'));
          alert("Account successfully created!!");
          navigate('/aboutus');
        } else {
          alert("An error occurred. Please try again.");
        }
      })
      .catch(err => {
        alert("An error occurred during sign-up. Please try again.");
        console.log('Axios error', err);
      });
  };

  return (
    <div className="signup">
      <div className='logo'>
        <img className='smallogo' src={toplogo} alt='logo' />
        <p className='logotext'>FITNESS</p>
      </div>
      <div className="signupcontainer">
        <form onSubmit={handleSubmit}>
          <p className='head'>Sign Up</p>
          <div className="signupfields">
            <input
              type='text'
              placeholder='Your Name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FaRegUser className='usericon' />
            <input
              type='email'
              placeholder='Email address'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <HiOutlineMail className='emicon' />
            <input
              type='password'
              placeholder='Your Password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FiLock className='pwdicon' />
          </div>
          <button className='signupbtn'>Sign Up</button>
          <p className='text'>Already have an account? <Link to='/login' className='link'><span>Login Here</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
