import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../AuthContext/Authcontext';

const Header = () => {
  const {
    user,
    logoutuser,
    itsdoctor,
    superuser,
} = useContext(AuthContext);


    
  return (
      <>
    <div className="navbar bg-white">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

      </ul>
    </div>
    <img src="/image/logo.png" alt="" className="h-12 w-25 bg-white rounded-lg" />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-black ">
      <li><Link >Consult Online</Link></li>
      <li><Link to='/Find_doctors'>Find Doctors</Link></li>
      <li><Link>Book Appointment</Link></li>
      <li tabIndex={0}>
        <details>
          <summary>Treatment</summary>
          <ul className="p-2 bg-white">
            <li><Link>Dentist</Link></li>
            <li><Link>Gynecoligist/Obstectrician</Link></li>
            <li><Link>general Physician</Link></li>
            <li><Link>Dermatologist</Link></li>
            <li><Link>ENT</Link></li>
            <li><Link>Homeopath</Link></li>
            <li><Link>Ayurveda</Link></li>
            
          </ul>
        </details>
      </li>
      <li><Link>Health Feed</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <Link to="/" className="btn bg-white text-black hover:bg-black hover:text-white">Book Free Appointement</Link>
  </div>

  
  


  <div className="navbar-end">
          {user ? (
           

            <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="/image/doc2.jpg" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
        <Link to="/About" className="justify-between">
          Profile
        </Link>
          
        </li>
        <li><a>Settings</a></li>
        <li>
          <a onClick={logoutuser}>Logout</a>
        </li>
      </ul>
    </div>

            

          ) : (
            <Link to="/login" className="btn bg-white text-black hover:bg-black hover:text-white">
              Login/Signup
            </Link>
          )}
    </div>

   


    
</div>
      </>
    )
}

export default Header
