// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home.js';
// import Signup from './components/Signup.js';
// import Login from './components/Login.js';
// import Navbar from './components/Navbar/Navbar.js';
// import Aboutus from './pages/Aboutus.js';

// function App() {
//   return (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/signup" element={<Signup/>} />
//       <Route path="/login" element={<Login/>} />
//       <Route path="/navbar" element={<Navbar/>}/>
//       {/* <Route path="/navbar/aboutus" element={<Aboutus/>}/> */}
//     </Routes>
//       <Routes>
//         <Route element={<Navbar />}> 
//           <Route path="aboutus" element={<Aboutus/>}/> 
//         </Route>
//       </Routes>
//   </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Aboutus from './pages/Aboutus.js';
import AddWorkout from './pages/AddWorkout.js';
import { ContactUs } from './pages/ContactUs.js';
function App() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path = '/aboutus' element={<Aboutus/>}/>
    <Route path = '/contactus' element={<ContactUs/>}/>
    <Route path="/workout" element={<AddWorkout/>} />
  </Routes>
</Router>
  );
}
export default App;