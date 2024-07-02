import React from 'react'
import abtus from '../components/assets/abtus.webp'
import Navbar from '../components/Navbar/Navbar.js';
import './Aboutus.css'
const Aboutus = () => {
  return (
    <div className='ab'>
      <Navbar/>
      <div className='abt'>
        <div className='abttxt'>
          <p className='abttxthd'>Be the best version of you</p>
          <p>This fitness tracker includes a workouts page where users can add, 
            update, and view their workout routines. This feature allows users to customize their fitness plans
             and track their progress. Additionally, this includes a contact page, providing 
             a convenient way for users to reach out for support.</p>
        </div>
        <div className='abtimg'>
          <img src={abtus} alt='bg'/>
        </div>
      </div>
    </div>
  )
}
export default Aboutus