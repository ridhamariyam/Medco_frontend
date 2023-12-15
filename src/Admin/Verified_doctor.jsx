import React, { useState, useEffect } from "react";
import SideMenu from './components/SideMenu';
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../const/urls";
import Nav from "./components/Nav";

function DoctorList({ doctors,loading }) {
  return (
    <div className="flex flex-wrap">
    {loading ? (
      <p>Loading...</p>
    ) : (
      doctors.map((doctor, key) => (
        <div key={key} className="max-w-md mx-2 my-2">
          <div className="card w-56 bg-white-100 rounded border">
            <figure style={{ height: '150px', overflow: 'hidden', marginTop: '10px' }}>
              <img
                src={doctor?.account.profile_image}
                alt={`Profile picture of ${doctor?.account.first_name}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {doctor?.account.first_name} {doctor?.last_name}
              </h2>
              <p>{doctor?.specialization}</p>
              <div className="card-actions justify-end">
                <Link to={`/Doctor_view/${doctor?.id}`}>
                  <button className="btn btn-primary">View Profile</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
  );
}

function AdminDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    // ... (unchanged)
  };

  const handleSearch = () => {
    setLoading(true); // Set loading state when initiating a search
    const apiUrl = searchQuery
      ? `${baseUrl}/doctor/verified_doctors/?search=${searchQuery}`
      : `${baseUrl}/doctor/verified_doctors/`;

    axios.get(apiUrl)
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch(); // Initial fetch, which will load all verified doctors
  }, []); 

  return (
    <>
      <div className="mx-auto flex">
        <Nav />
        <SideMenu />
        <div className="w-1/4 h-screen bg-white "></div>
        <div className="w-full bg-white h-screen">
          <div className="w-full bg-white"></div>
          <div className="container p-5 mt-8">
           
            <h1 className="text-2xl font-bold mb-4 text-gray-700">Verified Doctors</h1>

            <div className="rounded flex items-center mb-4 mt-4">
              <input
                type="text"
                placeholder="Search Doctors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded border border-gray-400 p-2 mr-2"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <DoctorList doctors={doctors} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDoctor;
