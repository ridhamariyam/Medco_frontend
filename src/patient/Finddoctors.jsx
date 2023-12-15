import React, { useState, useEffect } from "react";
import Header from "../main/header";
import axios from "axios";
import { baseUrl } from "../const/urls";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";


function Finddoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/medcoapp/find_doctors/?search=${searchTerm}`
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  useEffect(() => {
    // Fetch all doctors when the component mounts
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${baseUrl}/medcoapp/find_doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []); 

  return (
    <div>
      <Header />
      <div
        className="w-full h-96 border-4 border-blue-100"
        style={{
          backgroundImage: `url(/image/bg.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div className="flex justify-center items-center flex-col">
          <h1
            className="text-4xl font-bold"
            style={{
              color: "#0e7490",
              marginBottom: "0.5rem",
              marginTop: "-0.5rem",
            }}
          >
            CHOOSE YOUR DOCTOR
          </h1>
          <h1
            className="text-1xl"
            style={{
              color: "black",
              marginBottom: "0.5rem",
              marginTop: "-0.5rem",
            }}
          >
            Search The Doctor By Name or Speciality
          </h1>
          <div className="flex justify-center items-center mt-4">
            <input
              type="text"
              placeholder="Search by Name or Speciality"
              className="border p-2 mr-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 px-4">
        <div>
          <h1
            className="text-4xl font-bold"
            style={{
              color: "#0e7490",
              marginBottom: "0.5rem",
              marginTop: "-0.5rem",
            }}
          >
            AVAILABLE DOCTORS
          </h1>
        </div>

        <div className="flex flex-wrap gap-5 justify-center">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="card card-side shadow-[0_3px_10px_rgb(0,0,0,0.2)] border my-2 bg-base-100 w-2/5"
            >
              <figure className="max-w-[200px] h-[270px]">
                <img
                  src={doctor.account.profile_image}
                  alt="Movie"
                  className="w-full h-full object-cover"
                />
              </figure>
              
              <div className="card-body">
                <div className="absolute top-3 right-3 py-1 px-2 rounded-full dropdown dropdown-bottom dropdown-end cursor-pointer bg-slate-100">
                  <SlOptions
                    tabIndex={0}
                    className="text-xl text-black shadow-xl hover:scale-110 duration-300"
                  />
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 border rounded-box w-36 mt-2"
                  >
                    <li className="text-xs text-black hover:bg-gray-50 rounded-lg ">
                      <a>View</a>
                    </li>
                    <li className="text-xs text-black hover:bg-gray-50 rounded-lg ">
                      <a>option*</a>
                    </li>
                    <li className="text-xs text-black hover:bg-gray-50 rounded-lg ">
                      <a>option*</a>
                    </li>
                  </ul>
                </div>
                <h2 className="card-title">{doctor.account.first_name} {doctor.account.last_name}</h2>
                <p className="mb-4 text-base text-black dark:text-black">
                  <strong>Specialization:</strong> {doctor?.specialization}
                  <br />
                  <strong>Qualification:</strong> {doctor?.qualification}
                  <br />
                  <strong>Experience:</strong> {doctor?.experiance + ' Years'}
                  <br />
                  <strong>Consultation Fee:</strong> {'₹ '+doctor.fee} 
                  <br />
                  <strong>Language:</strong> {doctor?.language} 
                 
                </p>
                <p className="line-clamp-3] max-w-[500px] max-h-[100px] overflow-hidden"></p>
                <div className="card-actions justify-end">
                  <Link to={`/BookDoctor/${doctor.account.id}`}><button className="btn bg-defaultBtnColor bg-blue-400 hover:bg-blue-500 text-white">
                    Book Slot
                  </button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* <div key={doctor.id}>
         
<div className="flex h-screen">
  <div className="block rounded-lg bg-red-700 w-3/4 h-1/2 p-4 dark:bg-blue-200 ml-4">
    <h5 className="mb-2 text-xl font-medium leading-tight text-black dark:text-black">
    
        <img
          src={doctor.account.profile_image}
          alt={`Photo of ${doctor.account.first_name} ${doctor.account.last_name}`}
          className="rounded-full w-16 h-16 mx-auto mb-4"
        />
      
      {doctor.account.first_name} {doctor.account.last_name}
    </h5>
    <p className="mb-4 text-base text-black dark:text-black">
    Specialization: {doctor.specialization}
    <br/>
    Qualification:{doctor.qualification}
    <br />
    Experiance:{doctor.experiance+' Years'}
    <br/>
    Consultation Fee:{'₹'+doctor.fee}
    </p>
  </div>
  
</div>x

</div> */
}

export default Finddoctors;
