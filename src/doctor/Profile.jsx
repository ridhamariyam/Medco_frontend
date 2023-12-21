import React, { useState,useContext, useEffect } from "react";
import Nav from "./componnets/Nav";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Sidebar from "./componnets/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../const/urls";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext/Authcontext";


function Profile() {

  const [doctor, setDoctor] = useState(null);
  const {user} = useContext(AuthContext)
  const [profile_img, setImage] = useState(null)
    // const getDocDetail = () => {
    //   axios.get(`${baseUrl}/doctor/doctor_update/${user.user_id}`)
    //     .then(response => {
    //       setDoctor(response.data);
          
    //     })
    //     .catch(error => { 
    //       console.error('Error fetching doctors:', error);
    //     });
    // }

    const getDocDetail = () => {
      axios.get(`${baseUrl}/doctor/doctor_update/${user.user_id}`)
        .then(response => {
          const doctorData = response.data;
          console.log('response----->',response.data)
          if (doctorData.account && doctorData.account.profile_image) {
            
            setImage(doctorData.account.profile_image);
          }
          setDoctor(doctorData);
        })
        
        .catch(error => { 
          console.error('Error fetching doctors:', error);
        });
    }
   


  useEffect(() => {
    getDocDetail()
  }, []);
  useEffect(() => {
    console.log("Doctor data:", doctor);
  }, [doctor]);
  console.log("Profile Image:", profile_img);
    console.log("Doctor Profile Image:", doctor?.account.profile_image);


  return (
    <div>
      <Nav />
      <Sidebar />

      <div className="flex flex-col overflow-hidden">
        <div className="flex overflow-hidden">
          <div className="absolute right-0 top-0 w-4/5 h-full bg-gray-100 px-6 py-24   border border-gray-200 overflow-y-auto">
            <div className="h-full">

              <div className="border-b-2 block md:flex">

                <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white overflow-hidden shadow-md">

                  <div class="block rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ">
                    <a href="#!">
                      <img
                        class="rounded-t-lg"
                        src={doctor?.account.profile_image}
                        alt="rty"
                      />
                    </a>  
                  </div>

                  <div className="bg-white mt-2 h-28 rounded-lg">
                          {doctor?.bio}
                  </div>

                </div>

                <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                  <div className="rounded shadow p-6">
                    <div className="pb-6">
                      <h2 className="text-4xl font-bold">{doctor?.account.first_name+' '+doctor?.account.last_name}</h2>
                      <br />
                      <h3 className="text-2xl font-semibold">{doctor?.specialization}</h3>
                      <br />
                      <h1>{doctor?.qualification}</h1>
                    </div>

                    <div className="pb-6">
                      <label
                        htmlFor="name"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Experiance:
                      </label>
                      <div className="flex">
                        <input
                          disabled
                          id="username"
                          className="border-1 rounded-r px-4 py-2 w-full"
                          type="text"
                          value={doctor?.experiance+' Years'}
                        />
                      </div>
                    </div>
                    <div className="pb-6">
                      <label
                        htmlFor="name"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Language:
                      </label>
                      <div className="flex">
                        <input
                          disabled
                          id="username"
                          className="border-1 rounded-r px-4 py-2 w-full"
                          type="text"
                          value={doctor?.language}
                        />
                      </div>
                    </div>
                    
                    <div className="pb-4">
                      <label
                        htmlFor="about"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Email
                      </label>
                      <input
                        disabled
                        id="email"
                        className="border-1 rounded-r px-4 py-2 w-full"
                        type="email"
                        value={doctor?.account.email}
                      />
                     <Link to="/Edit_Profile">
                      <button className="btn bg-defaultBtnColor bg-blue-400 hover:bg-blue-500 text-white">
                        EDIT
                      </button>
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
