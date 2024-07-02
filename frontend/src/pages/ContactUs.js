import React, { useRef } from 'react';
import Navbar from '../components/Navbar/Navbar.js';
import emailjs from '@emailjs/browser';
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import './ContactUs.css';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_3opzzth', 'template_dbth2mb', form.current, {
        publicKey: 'GBc1P0lOJWeECroGs',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
  <div>
    <Navbar/>
    <div className='contact'>
    <div className='forminfo'>
        <form className='cont' ref={form} onSubmit={sendEmail}>
         <label>Name</label>
         <input type="text" placeholder='Your name' name="from_name" required /><br/>
         <label>Email</label>
         <input type="email" placeholder='Email' name="from_email" required /><br/>
         <label>Message</label>
         <textarea className='ta' name="message" /><br/>
         <button type="submit" className='sendbtn' value="Send" >Send</button><br/>
        </form>
    </div>
      <div className='contactinfo'>
        <div className='contactbox'>
          <div className='icon'>
            <FaLocationDot className='icon1'/>
          </div>
          <div className='iconinfo'>
             <h4>Address</h4>
             <p>Near Balaji Gardens,
              Gopalapatnam,Vizag 530029</p>
          </div>
        </div>
        <div className='contactbox'>
          <div className='icon'>
           <FaPhone className='icon2'/>
          </div>
          <div className='iconinfo'>
             <h4>Phone</h4>
             <p>9492726789</p>
          </div>
        </div>
        <div className='contactbox'>
          <div className='icon'>
          <MdEmail className='icon3'/>
          </div>
          <div className='iconinfo'>
             <h4>Email</h4>
             <p>pavanivallem@gmail.com</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  );
};
