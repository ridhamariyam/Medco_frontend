import React, { useState, useEffect } from "react";
import Header from "../main/header";
import axios from "axios";
import { baseUrl } from "../const/urls";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";
import Footer from "../main/footer";


function Finddoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {/* Header Component */}
      <Header />

      {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
        <>
          {/* Header Section */}
          <div className="w-full h-96 border-4 border-blue-100" style={{
            backgroundImage: `url(/image/bg.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}>
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-4xl font-bold" style={{ color: "#0e7490", marginBottom: "0.5rem", marginTop: "-0.5rem" }}>
                CHOOSE YOUR DOCTOR
              </h1>
              <h1 className="text-1xl" style={{ color: "black", marginBottom: "0.5rem", marginTop: "-0.5rem" }}>
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
                <button className="bg-blue-500 text-white p-2" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Doctors List Section */}
          <div className="mt-4 px-4">
            <div>
              <h1 className="text-4xl " style={{ color: "#0e7490", marginBottom: "0.5rem", marginTop: "-0.5rem" }}>
                {doctors.length} {doctors.length === 1 ? 'Doctor' : 'Doctors'} Available
              </h1>
              <h1 style={{ color: "#0e7490", marginBottom: "0.5rem", marginTop: "-0.5rem" }}>
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
};

// DoctorCard Component
const DoctorCard = ({ doctor }) => (
  <div className="mb-4">
    <div className="bg-white p-8 flex items-center justify-between">
      {/* Left side (photo) */}
      <div className="flex-shrink-0 mr-4">
        <img src={doctor.account.profile_image} alt="Doctor" className="h-16 w-16 object-cover h-52 w-48" />
      </div>

      {/* Middle side (details) */}
      <div className="flex-grow">
        <h2 className="text-xl  text-blue-400">
          {doctor.account.first_name} {doctor.account.last_name}
        </h2>
        <p>
          <strong className="text-gray-700">Specialization:</strong> {doctor?.specialization}
          <br />
          <strong className="text-gray-700">Qualification:</strong> {doctor?.qualification}
          <br />
          <strong className="text-gray-700">Experience:</strong> {doctor?.experiance + ' Years'}
          <br />
          <strong className="text-gray-700">Consultation Fee:</strong> {'₹ ' + doctor.fee}
          <br />
          <strong className="text-gray-700">Language:</strong> {doctor?.language}
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