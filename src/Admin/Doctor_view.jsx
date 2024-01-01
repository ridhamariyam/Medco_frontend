import React, { useState, useEffect } from 'react';
import SideMenu from './components/SideMenu';

import axios from 'axios';
import { baseUrl } from '../const/urls';
import { useParams } from 'react-router-dom';
import Nav from './components/Nav';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DoctorView() {
  const [image, setImage] = useState('/image/doc2.jpg');
  const [doctor, setDoctor] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [blocked ,setBlocked ] = useState()
  


  const { id } = useParams();

  const getDocDetail = () => {
    axios.get(`${baseUrl}/doctor/doctor_details/${id}`)
      .then(response => {
        setDoctor(response.data);
        console.log(setDoctor)
        setIsVerified(response.data.is_verified); 
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };

  useEffect(() => {
    getDocDetail();
  }, [id,doctor]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerificationClick = async () => {
    try {
      const response = await axios.post(`${baseUrl}/doctor/verify_doctor/${id}/verify/`, {});
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        setIsVerified(true);
        console.log('User verified successfully!');
      } else {
        console.error('User verification failed. Status:', response.status);
      }
    } catch (error) {
      console.error('Error during user verification:', error);
      if (error.response) {
       
       
      } else if (error.request) {
        console.error('No response received. Request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };


  const block_user = async (id) => {
    try {
      console.log("butotn")
      const response = await axios.post(`${baseUrl}/doctor/Block_user/${id}/`, {});
  
      if (response.status === 200) {
        setBlocked(false)
      } else {
        console.error('Unable to Block User');
      }
    } catch (error) {
      console.error('Unable to blockll:', error);
    }
  };

  
  const unblock_user = async (id) => {
    try {

      console.log(blocked,"status")
        const response = await axios.post(`${baseUrl}/doctor/Unblock_user/${id}/`, {});

        if (response.status === 200) {
          setBlocked(true)
        } else {
            console.error('Unable to Unblock User');
        }
    } catch (error) {
        console.error('Unable to unblock:', error);
    }
};
  

  return (
    <div>
       <Nav/>
      <SideMenu />
        

      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">


        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Doctor profile page</h2>
        </div>
        <div className="text-center mt-8">
            <button
              className={`${
                doctor?.account.is_active
                  ? "bg-red-500 hover:bg-red-700"
                  : "bg-green-500 hover:bg-green-700"
              } text-white font-bold py-2 px-4 rounded`}
              onClick={() =>
                doctor?.account.is_active ? block_user(doctor?.id) : unblock_user(doctor?.id)
              }
            >
              {doctor?.account.is_active ? "Block" : "Unblock"}
            </button>




      {isVerified ? (
        <div>
         
         
         <p style={{ color: 'green', fontWeight: 'bold', marginTop: '8px' }}>Doctor Verified</p>
        </div>
      

      ) : (
        <button onClick={handleVerificationClick} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
  Verify Doctor
</button>

      )}
</div>



  




        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="flex justify-center items-center">
            <label htmlFor="profileImage" className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                className="hidden"
                onChange={handleImageChange}
              />
              <img
                className="rounded-full h-40 w-40 object-cover m-4"
                src={ doctor?.account.profile_image}
                alt="Doctor's Profile Image"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  disabled
                  id="first-name"
                  placeholder={doctor?.account.first_name}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  disabled
                  name="last-name"
                  id="last-name"
                  placeholder={doctor?.account.last_name}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold leading-6 text-gray-900">
                Gender
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  disabled
                  name="gender"
                  id="gender"
                  placeholder={doctor?.gender}
                  autoComplete="gender"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            {/* Speciality */}
            <div>
              <label htmlFor="speciality" className="block text-sm font-semibold leading-6 text-gray-900">
                Speciality
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  disabled
                  name="speciality"
                  id="speciality"
                  placeholder={doctor?.specialization}
                  autoComplete="speciality"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <label htmlFor="qualifications" className="block text-sm font-semibold leading-6 text-gray-900">
                Qualifications
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  disabled
                  name="qualifications"
                  id="qualifications"
                  placeholder={doctor?.qualification}
                  autoComplete="qualifications"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="sm:col-span-2">
              <label htmlFor="experience" className="block text-sm font-semibold leading-6 text-gray-900">
                Experience
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  disabled
                  name="experience"
                  id="experience"
                  placeholder={doctor?.experiance+' Years'}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  disabled
                  name="email"
                  id="email"
                  placeholder={doctor?.account.email}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="sm:col-span-2">
              <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                Phone number
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    disabled
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option>IN</option>

                  </select>
                  {/* <ChevronDownIcon
                    className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                  /> */}
                </div>
                <input
                  type="tel"
                  name="phone-number"
                  disabled
                  id="phone-number"
                  placeholder={" +91"+doctor?.account.phone}
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>
            {/* <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Uploaded Documents</h3>
              <ul>

                <img
                  src='/image/document.jpg'
                  alt=""
                  className="mt-2 h-20 w-20 object-cover rounded"
                />

              

              </ul>
            </div> */}




          </div>

          {/* Submit Button */}
          {/* <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save changes
            </button>
          </div> */}
        </form>
      </div>
   
    </div>
  );
}

