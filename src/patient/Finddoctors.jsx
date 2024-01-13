import React, { useState, useEffect } from "react";
import Header from "../main/header";
import axios from "axios";
import { baseUrl } from "../const/urls";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";
import Footer from "../main/footer";
import { CiSearch } from "react-icons/ci";

function Finddoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  
   
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
      <>
        {/* Header Section */}
        <div
          className="w-full h-44 border-4 border-blue-100"
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
            {/* <h1 className="text-4xl font-bold" style={{ color: "#0e7490", marginBottom: "0.5rem", marginTop: "-0.5rem" }}>
                CHOOSE YOUR DOCTOR
              </h1> */}
            {/* <h1 className="text-1xl" style={{ color: "black", marginBottom: "0.5rem", marginTop: "-0.5rem" }}>
                Search The Doctor By Name or Speciality
              </h1> */}
            <div className="flex justify-center items-center mt-4">
              <div className="relative">
                <CiSearch
                  className="absolute left-3 top-2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by Name or Speciality"
                  className="border p-1 pl-10" // Adjust padding for the icon
                  style={{ width: "900px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button
                className="bg-blue-500 text-white p-1"
                style={{ width: "100px" }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>


        
{/* 
        <div className="relative inline-block text-left">
  <div className="bg-blue-900 h-12 w-screen">
    <button type="button" className="inline-flex items-center justify-center w-full h-full text-white focus:outline-none">
      Select an option
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    <div className="hidden absolute z-50 mt-2 bg-white border rounded-md shadow-lg">
      <ul className="py-1">
        <li>
          <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Option 1
          </button>
          <ul className="py-1">
            <li>
              <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Female
              </button>
            </li>
            <li>
              <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Male
              </button>
            </li>
          </ul>
        </li>
        <li>
          <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Option 2
          </button>
         
        </li>
        <li>
          <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Option 3
          </button>
        
        </li>
      </ul>
    </div>
  </div>
</div> */}

{/* <div className="relative inline-block text-left">
      <div className="bg-blue-900 h-12 w-screen">
        <button
          type="button"
          className="inline-flex items-center justify-center w-full h-full text-gray-800 focus:outline-none"
          onClick={toggleDropdown}
        >
          Select an option
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div className={`absolute z-50 mt-2 bg-white border rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="py-1">
            <li>
              <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Option 1
              </button>
              <ul className="py-1">
                <li>
                  <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Female
                  </button>
                </li>
                <li>
                  <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Male
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Option 2
              </button>
            </li>
            <li>
              <button type="button" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Option 3
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div> */}



        {/* Doctors List Section */}
        <div className="mt-4 px-4">
          <div>
            <h1
              className="text-4xl "
              style={{
                color: "#0e7490",
                marginBottom: "0.5rem",
                marginTop: "-0.5rem",
              }}
            >
              {doctors.length} {doctors.length === 1 ? "Doctor" : "Doctors"}{" "}
              Available
            </h1>
            <h1
              style={{
                color: "#0e7490",
                marginBottom: "0.5rem",
                marginTop: "-0.5rem",
              }}
            >
              Book appointments with minimum wait-time & verified doctor details
            </h1>
          </div>
          <br />

          {/* Doctors Cards */}
          <div className="w-3/4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
        <br />
      </>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

// DoctorCard Component
const DoctorCard = ({ doctor }) => (
  <div className="mb-4">
    <div className="bg-white p-8 flex items-center justify-between">
      {/* Left side (photo) */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={doctor.account.profile_image}
          alt="Doctor"
          className="h-16 w-16 object-cover h-52 w-48"
        />
      </div>

      {/* Middle side (details) */}
      <div className="flex-grow">
        <h2 className="text-xl  text-blue-400">
          {doctor.account.first_name} {doctor.account.last_name}
        </h2>
        <p>
          <strong className="text-gray-700">Specialization:</strong>{" "}
          {doctor?.specialization}
          <br />
          <strong className="text-gray-700">Qualification:</strong>{" "}
          {doctor?.qualification}
          <br />
          <strong className="text-gray-700">Experience:</strong>{" "}
          {doctor?.experiance + " Years"}
          <br />
          <strong className="text-gray-700">Consultation Fee:</strong>{" "}
          {"₹ " + doctor.fee}
          <br />
          <strong className="text-gray-700">Language:</strong>{" "}
          {doctor?.language}
        </p>
      </div>

      {/* Right side (Book Slot button) */}
      <div className="flex-shrink-0">
        <Link to={`/BookDoctor/${doctor.account.id}`}>
          <button className="btn bg-defaultBtnColor bg-blue-400 hover:bg-blue-500 text-white">
            Book Slot
          </button>
        </Link>
      </div>
    </div>

    {/* Divider */}
    <hr className="my-2 border-gray-300" />
  </div>
);

export default Finddoctors;
