// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import newlogo from '../assets/newlogo.jpg'
// import { HiMenu } from "react-icons/hi";
// import './Navbar.css'
// const Navbar = () => {
//    return (
//     <div className='navlink'>
//       <div className='logoicon'>
//        <img src={newlogo} alt='logo' className='fitnessimg'/>
//        <h2 className='logotxt'>FITNESS</h2>
//       </div>
//       <div className='right'>
//         <ul className='navmenu'>
//           <li><NavLink exact to='/navbar/aboutus' className='link' activeClassName='active'>About Us</NavLink></li>
//           <li><NavLink to='/navbar/dashboard' className='link' activeClassName='active'>Dashboards</NavLink></li>
//           <li><NavLink to='/navbar/workout' className='link' activeClassName='active'>Workouts</NavLink></li>
//           <li><NavLink to='/navbar/contactus' className='link' activeClassName='active'>Contact Us</NavLink></li>
//         </ul>
//       </div>
//        <div className='navlogout'>
//         <NavLink to='/'><h4 className='lgout'>Logout</h4></NavLink>
//       </div>
//       <HiMenu className='menubtn'/>
//       <div className='dropdown-menu'>
//         <ul>
//           <li><NavLink exact to='/navbar/aboutus' className='link' activeClassName='active'>About Us</NavLink></li>
//           <li><NavLink to='/navbar/dashboard' className='link' activeClassName='active'>Dashboards</NavLink></li>
//           <li><NavLink to='/navbar/workout' className='link' activeClassName='active'>Workouts</NavLink></li>
//           <li><NavLink to='/navbar/contactus' className='link' activeClassName='active'>Contact Us</NavLink></li>
//           <NavLink to='/'><h4 className='droplog'>Logout</h4></NavLink>
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Navbar
// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { HiMenu } from 'react-icons/hi';
// import newlogo from '../assets/newlogo.jpg'
// import './Navbar.css'

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.clear();
//   };
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <div className={`navlink ${menuOpen ? 'menu-open' : ''}`}>
//       <div className='logoicon'>
//         <img src={newlogo} alt='logo' className='fitnessimg'/>
//         <h2 className='logotxt'>FITNESS</h2>
//       </div>
//       <div className={`right ${menuOpen ? 'show-menu' : ''}`}>
//         <ul className='navmenu'>
//           <li><NavLink to='/aboutus' className='link' activeClassName='active'>About</NavLink></li>
//           <li><NavLink to='/navbar/dashboard' className='link' activeClassName='active'>Dashboards</NavLink></li>
//           <li><NavLink to='/workout' className='link' activeClassName='active'>Workouts</NavLink></li>
//           <li><NavLink to='/contactus' className='link' activeClassName='active'>Contact Us</NavLink></li>
//         </ul>
//       <div className={`navlogout ${menuOpen ? 'show-menu' : ''}`}> 
//          <NavLink to='/'><h4 className='lgout' onClick={handleLogout}>Logout</h4></NavLink>
//       </div>
//       <HiMenu className='menubtn' onClick={toggleMenu} />
//     </div>
//     </div>
//   );
// }

// export default Navbar;




import React, { useState,useEffect } from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon
import toplogo from '../assets/toplogo.jpg';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null); // State to manage profile picture

  let username=localStorage.getItem('username');
  const location = useLocation();
  const navigate=useNavigate();
  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to the Signup page
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePic(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setMenuOpen(false); // Close the menu whenever the route changes
  }, [location]);

  return (
    <div className={`navlink ${menuOpen ? 'menu-open' : ''}`}>
      <div className='logoicon'>
        <img className='smallogo fitnessimg' src={toplogo} alt='logo' />
        <h2 className='logotxt'>FITNESS</h2>
      </div>
      <div className={`right ${menuOpen ? 'show-menu' : ''}`}>
        <ul className='navmenu'>
          <li><NavLink to='/aboutus' className='link' activeClassName='active' onClick={toggleMenu}>About</NavLink></li>
          {/* <li><NavLink to='/navbar/dashboard' className='link' activeClassName='active'>Dashboard</NavLink></li> */}
          <li><NavLink to='/workout' className='link' activeClassName='active' onClick={toggleMenu}>Workouts</NavLink></li>
          <li><NavLink to='/contactus' className='link' activeClassName='active' onClick={toggleMenu}>Contact Us</NavLink></li>
        </ul>
        <div className={`profile-dropdown right ${dropdownOpen ? 'show-menu' : ''}`}>
          {profilePic ? (
            <img 
              src={profilePic} 
              alt='profile' 
              className='profile-pic userlogo' 
              onClick={toggleDropdown} 
            />
          ) : (
            <FaUserCircle 
              className='profile-icon' 
              onClick={toggleDropdown} 
            /> 
          )}
          {dropdownOpen && (
            <div className='dropdown-menu'>
             {username ? ( <p className='username'>{username}</p>):( <p className='username' onClick={handleSignupClick}>Login/signup</p>)}
              <div>
                <label className='dropdown-link' htmlFor='profilePicInput'>
                  Add/Update Profile
                </label>
                <input 
                  type='file' 
                  id='profilePicInput' 
                  style={{ display: 'none' }} 
                  onChange={handleProfilePicChange} 
                /><br/>
              </div>
              <NavLink to='/' className='log-out'  onClick={handleLogout}>Logout</NavLink>
            </div>
          )}
        </div>
        <HiMenu className='menubtn' onClick={toggleMenu} />
      </div>
    </div>
  );
}

export default Navbar;

