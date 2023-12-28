import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../const/urls";
import Loader from "./Loader";



function Signuppage_user(e) {
  const navigate = useNavigate();
 const [loading,setLoading]=useState(false)

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullname = e.target.fullname.value;


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          background: "#ADD8E6", // Replace with your desired background color
        },
      });
      return;
    }

    // password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Invalid Password",
        text: "Password must be at least 8 characters long and contain at least one uppercase letter and one digit.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          background: "#ADD8E6",
        },
      });
      return;
    }

    if (fullname.length < 6) {
      Swal.fire({
        title: "Invalid Full Name",
        text: "Full name must be at least 6 characters long.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          background: "#ADD8E6",
        },
      });
      return;
    }

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullname", fullname);

    try {
      console.log("oiuytrew");
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/medcoapp/register/`,

        formData
        

      ).then((res)=>{
       
        if(res.status == 201){
          
          setLoading(false);
          navigate('/verify', { state: { email: e.target.email.value} })
        }
      }).catch((error)=>{
        console.log(error.message)
      })

   

    } catch (error) {
      // Handle signup error
      console.error("Errorss:", error);

      setLoading(false);

      Swal.fire({
        title: "Signup Failed",
        text: "An error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

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
        <div className="flex items-center">
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
                clipRule="evenodd"
              />  
            </svg>
          </Link>
        </div>

        <div className="mt-8 ">
          
        {loading ? (
        // Render the loader when isLoading is true
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
          <form className="form-signin" id="form" onSubmit={handleSignup}>

            
            <div className="flex justify-end">
              <div className="text-center text-grey mr-4 ">Are you doctor?</div>
              <Link
                to="/Doctorsignup"
                className="text-blue-500 underline"
                style={{ fontSize: "14px" }}
              >
                Register here
              </Link>
            </div>
           
        <br />
            <input
              id="email"
              type="text"
              name="email"
              className="form-control w-64 rounded-md bg-white text-gray-400"
              placeholder="Email"
              required=""
              autoFocus=""
            />
            <br />
            <input
              id="password"
              type="password"
              name="password"
              className="form-control w-64 rounded-md bg-white"
              placeholder="Password"
            />
            <br />
            <input id="forward_url" name="url" type="hidden" value="null" />

            {/* Add additional signup fields as needed */}
            <input
              id="fullname"
              type="text"
              name="fullname"
              className="form-control w-64 rounded-md bg-white"
              placeholder="Full Name"
              required=""
            />
            <br />
            {/* Add more signup fields as needed */}

            <button
              className="form-control linkone w-32 mx-auto"
              type="submit"
              name="myButton"
              id="submitBtn"
            >
              Send Otp
            </button>
          </form>
            )}
          <span style={{ color: "red", display: "none" }} id="errorMsg"></span>
        </div>
      </div>
    </div>
  );
}

export default Signuppage_user;
