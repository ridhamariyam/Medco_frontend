import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { baseUrl } from '../const/urls';
import axios from 'axios';

const Otp = () => {
    
    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate()

    const handleOtp = async (e)=>{
        
        e.preventDefault()
        let formData = new FormData();
        formData.append("email", e.target.email.value);
        formData.append("otp", e.target.otp.value);
        const response = await axios.patch(
            `${baseUrl}/medcoapp/varify/`,
    
            formData
          ).then((res)=>{
            if(res.status == 200){
              navigate('/login')
            }
          }).catch((err)=>{
            alert(err)
          })
    }
    
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/bg.jpeg')" }}
    >
      <div className="bg-white p-4 rounded-3xl sm:w-full md:w-1/3 md:mx-auto">
        <h3 className="text-center text-lightyellow flex justify-center items-center">
          <img
            src="/image/logo.png"
            alt=""
            className="h-15 w-60 bg-white rounded-lg"
          />
        </h3>
        

        <div className="mt-8 ">
          <form className="form-signin" id="form" onSubmit={handleOtp}>
          <input
              id="email"
              name="email"
              type="hidden"
              autoComplete="username"
              required
             
              defaultValue={email}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
          id="otp"
          type="text"
          name="otp"
          className="form-control w-64 rounded-md bg-white"
          placeholder="Enter OTP "
          
        />
        <br />

        <button
          className="form-control linkone w-32 mx-auto"
          type="submit"
          name="myButton"
          id="submitBtn"
        >
          Verify OTP
        </button>
        <br></br>
          </form>

          <span style={{ color: "red", display: "none" }} id="errorMsg"></span>
        </div>
      </div>
    </div>
  )
}

export default Otp
