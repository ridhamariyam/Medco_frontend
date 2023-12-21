import React, { useContext, useEffect } from 'react'
import AuthContext from '../AuthContext/Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Loginpage () {
  const {
    user,
    doctor,
    
    handledoctorlogin,
    superuser,
    itsdoctor,
    userlogin,
    getLocation,
    // role,
  }=useContext(AuthContext)
  const location = useLocation();
  useEffect(() =>{
    console.log(location.state);
    getLocation(location.state)
  },[])
 
return (
  <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image/bg.jpeg')" }}>
     <div className="bg-white p-4 rounded-3xl sm:w-full md:w-1/3 md:mx-auto">
     

      <h3 className="text-center text-lightyellow flex justify-center items-center">
        <img src="/image/logo.png" alt="" className="h-15 w-60 bg-white rounded-lg" />
      </h3>

      <div className="mt-8 ">
      
      <form className="form-signin" id="form" onSubmit={userlogin}>
          
          <input
            id="uname"
            type="email"
            name="email" 
            
            className="form-control w-64 rounded-md bg-white"
            placeholder="Enter your email"
            required=""
            autoFocus=""
          />
          <br />
          <input
            id="password"
            type="password"
            name="password"
            className="form-control w-64 rounded-md bg-white"
            placeholder="Enter your password"
          />
          <br />
          <input id="forward_url" name="url" type="hidden" value="null" />

          <button
            className="form-control linkone w-32 mx-auto"
            type="submit"
            name="myButton"
            id="submitBtn"
          >
            Sign in
          </button>
          <Link
                to="/Signup_patient"
                className="text-blue-500 text-mx underline"
                style={{ fontSize: '14px' }}
              >
               New User?
          </Link>
          <Link
            to="/Pass_reset" 
            className="flex justify-end text-blue-500 text-mx underline"
            style={{ fontSize: '14px' }}
          >
            Forgot password?
          </Link>
         
         
          <span className="clearfix"></span>
         
          <span className="clearfix"></span>
          <input type="hidden" name="userUtcOffset" value="330" />
        </form>

        <span style={{ color: 'red', display: 'none' }} id="errorMsg"></span>
      </div>

    </div>
  </div>
);
};
export default Loginpage
