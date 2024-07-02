import React from 'react'
import { Link} from 'react-router-dom'
import toplogo from './assets/toplogo.jpg'
import './Home.css'
import bgimg from './assets/bgimg.avif'
const Home = () => {
  return (
    <div>
    <div className='initialpg'>
    <div className='logo'>
         <img className='smallogo' src={toplogo} alt='logo'/>
         <p className='logotext'>FITNESS</p>
    </div>
    <div className='entirebg'>
     <div className='bgimage'>
      <img src={bgimg} alt='bg'/>
     </div>
     <div className='box'>
      <div className='details'>
        <h2>Welcome to Our Fitness Tracker!</h2>
        <p>Ready to take the first step towards a healthier, happier you?
         Click the button below to get started with our fitness tracker!
        </p>
      </div>
      <div className='startbtn'>
       <Link to="/signup">
        <button>Get Started</button>
       </Link>
      </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Home