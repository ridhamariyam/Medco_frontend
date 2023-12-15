import React, { useContext, useEffect, useState } from "react";
import Nav from "./componnets/Nav";
import Sidebar from "./componnets/Sidebar";
import AuthContext from "../AuthContext/Authcontext";
import axios from "axios";
import { baseUrl } from "../const/urls";

function Edit_Profile() {
  const [doctor, setDoctor] = useState(null);
  const {user} = useContext(AuthContext)
  const [profile_image, setImage] = useState(null)
  const getDocDetail = () => {
    axios.get(`${baseUrl}/doctor/doctor_update/${user.user_id}`)
    
      .then(response => {
        const doctorData = response.data;
        console.log(doctorData,'qqqqqqqqqq')
        if (doctorData.account && doctorData.account.profile_image) {
          setImage(doctorData.account.profile_image);
        }
        setDoctor(doctorData);
      })
      .catch(error => { 
        console.error('Error fetching doctors:', error);
      });
  };
  

  useEffect(() => {
    getDocDetail()
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault()
    let formData = new FormData();
    formData.append('first_name', e.target.first_name?.value);
    formData.append('last_name', e.target.last_name?.value);
    formData.append('specialization', e.target.specialization?.value);
    formData.append('qualification', e.target.qualification?.value);
    formData.append('experiance', e.target.experience?.value);
    formData.append('language', e.target.language?.value);
    formData.append('bio', e.target.bio?.value);
   
    if (profile_image) {formData.append('profile_image', profile_image);}
    axios.patch(`${baseUrl}/doctor/doctor_details/${doctor.id}`, formData).then((res)=>{
      console.log('Server Response:', res);
      console.log('--------',profile_image)
      if (res.status == 200){
        alert('updated')
      }
    })
    
    .catch((error) => {
      console.error('Error updating profile:', error);
      
    });
  }

  return (
    <div>
      <Nav />
      <Sidebar />

      <div className="flex flex-col overflow-hidden">
      <form onSubmit={handleSubmit}>

        <div className="flex overflow-hidden">
          <div className="absolute right-0 top-0 w-4/5 h-full bg-blue-100 px-6 py-24 border border-gray-200 overflow-y-auto">
            <div className="h-full">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  
                  <div className="mt-8 mb-12">
                    <h2 className="text-5xl font-extrabold text-gray-700 tracking-wide leading-tight underline">
                      EDIT PROFILE
                    </h2>
                  </div>

                  <label
                    htmlFor="profile-image"
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  >
                    Profile Image
                  </label>

                  <div className="mt-2">
                    <img
                      src={doctor?.account.profile_image}
                      alt="Profile Preview"
                      className="rounded max-h-32 object-contain"
                      
                    />
                  </div>

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    name="profileImage"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4"
                    onChange={(e) => { 
                      if (e.target.files[0] != null)
                        setImage(e.target.files[0]);
                    }}
                  />
                </div>
                <br />

                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="grid-first-name"
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    >
                      First Name
                    </label>

                    <input
                      id="grid-first-name"
                      type="text"
                      name="first_name"
                      defaultValue={doctor?.account.first_name}
                      placeholder="Jane"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    />
                  </div>

                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="grid-first-name"
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    >
                      First Name
                    </label>

                    <input
                      id="grid-first-name"
                      type="text"
                      name="last_name"
                      defaultValue={doctor?.account.last_name}
                      placeholder="Jane"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    />
                  </div>

                  <div className="md:w-1/2 px-3">
                    <label
                      htmlFor="grid-last-name"
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    >
                      Specialization
                    </label>
                    <input
                      id="grid-last-name"
                      type="text"
                      name="specialization"
                      defaultValue={doctor?.specialization}
                      placeholder="Eg:Dentist"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                  </div>

                  <div className="md:w-1/2 px-3">
                    <label
                      htmlFor="grid-last-name"
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    >
                      Qualification
                    </label>
                    <input
                      id="grid-last-name"
                      type="text"
                      defaultValue={doctor?.qualification}
                      name="qualification"
                      placeholder="Eg:MBBS, MS - ENT, DNB - Otorhinolaryngology"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                  </div>
                </div>

                <div className="-mx-3 md:flex mb-2">
                  {/* Experience */}
                  <div className="md:w-1/2 px-3">
                    <label
                      htmlFor="grid-experience"
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    >
                      Experience
                    </label>
                    <input
                      id="grid-experience"
                      type="text"
                      name="experience"
                      defaultValue={doctor?.experiance}
                      placeholder="Years"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                  </div>

                  {/* Language */}
                  <div className="md:w-1/2 px-3">
                    <label
                      htmlFor="grid-language"
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    >
                      Language
                    </label>
                    <input
                      id="grid-language"
                      type="text"
                      name="language"
                      defaultValue={doctor?.language}
                      placeholder="Eg: English, Malayalam"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                  </div>

                  {/* Qualification */}
                  

                  {/* Additional Qualification */}
                  <div className="md:w-1/2 px-3">
                    <label
                      htmlFor="grid-additional-qualification"
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    >
                      Bio
                    </label>
                    <textarea
                      id="grid-additional-qualification"
                      type="text"
                      name="bio"
                      defaultValue={doctor?.bio}
                      placeholder="Eg: Dr.Martin is a Homoeopath in HSR Layout, Bangalore and has an experience of 23 years in this field."
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button className="btn bg-defaultBtnColor h-10 w-20 bg-blue-400 hover:bg-blue-500 text-white" type="submit">
                    EDIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Edit_Profile;
