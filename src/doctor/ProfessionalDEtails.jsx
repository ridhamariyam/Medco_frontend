// Import statements
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Nav from "./componnets/Nav";
import Sidebar from "./componnets/Sidebar";
import Modal from "react-modal";
import AuthContext from "../AuthContext/Authcontext";
import { baseUrl } from "../const/urls";

// Component function
function ProfessionalDetails() {
  // State variables


  const [doctor, setDoctor] = useState({});
  const { user } = useContext(AuthContext);
  const [profile_image, setImage] = useState(null);
  const [professionalDetails, setProfessionalDetails] = useState("");

  // Fetch professional details
  const getDocDetail = () => {
    axios.get(`${baseUrl}/doctor/Professionaldetails/${user.user_id}/`)
      .then(response => {
        const doctorData = response.data;
        console.log(doctorData, 'qqqquuyuuuqqqqqq');
        setDoctor(doctorData);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };

  
  useEffect(() => {
    getDocDetail();
  }, []);

  const getDocument = () => {
    axios.get(`${baseUrl}/doctor/ShowPdf/${user.user_id}/`)
      .then(response => {
        const doctorData = response.data;
        console.log(doctorData, 'nokk');
        setImage(doctorData);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };

  
  useEffect(() => {
    getDocument();
  }, []);



  // Render
  return (
    
    
    <div className="flex flex-col h-screen overflow-hidden">
       <Nav />
      <Sidebar />
      <div className="flex h-full overflow-hidden">
      <div className="absolute right-0 top-10 w-4/5 h-3/4 bg-gray-100 px-6 py-12 border-l border-gray-200 overflow-y-auto">
  <div className="h-full">
    {/* Professional Details Form */}
    <form className="bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Professional Details
      </h2>

      {/* Clinic/Hospital Address */}
      <div className="mb-6">
  <label
    htmlFor="clinicAddress"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Clinic/Hospital Address
  </label>
  <div className="border border-gray-300 p-4 rounded-md">
    <p className="text-gray-400">{doctor?.clinic_address}</p>
  </div>
</div>


      {/* Graduation Year */}
      <div className="mb-6">
        <label
          htmlFor="graduationYear"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Graduation Year
        </label>
        <div className="border border-gray-300 p-4 rounded-md">
        <p className="text-gray-400">{doctor?.graduation_year}</p>
        </div>
      </div>

      {/* Medical License */}
      <div className="mb-6">
        <label
          htmlFor="medicalLicense"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Medical License
        </label>
        <div className="border border-gray-300 p-4 rounded-md">
        <p className="text-gray-400">{doctor?.medical_license}</p>
        </div>
       
      </div>

      {/* University */}
      <div className="mb-6">
        <label
          htmlFor="university"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          University
        </label>
        <div className="border border-gray-300 p-4 rounded-md"> <p className="text-gray-400">{doctor?.university}</p>
        </div>
       
      </div>
    </form>
  </div>
</div>

      </div>
    </div>
  );
}


// Export component
export default ProfessionalDetails;
