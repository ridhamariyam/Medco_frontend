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
    <div>
      {/* Navigation components */}
      <Nav />
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col overflow-hidden">
        <div className="flex overflow-hidden">
          <div className="absolute right-0 top-0 w-4/5 h-full bg-gray-1 px-6 py-24 border border-gray-200 overflow-y-auto">
            <div className="h-full">
              {/* Professional Details Form */}
              <form className="bg-white p-8 rounded-md">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">
                  Professional Details
                </h2>

                {/* Clinic/Hospital Address */}
                <div className="mb-4">
                  <label htmlFor="clinicAddress" className="block text-sm font-medium text-gray-700">
                    Clinic/Hospital Address
                  </label>
                  <p className="text-gray-700">{doctor?.clinic_address}</p>
                </div>

                {/* Graduation Year */}
                <div className="mb-4">
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
                    Graduation Year
                  </label>
                  <p className="text-gray-700">{doctor?.graduation_year}</p>
                </div>

                {/* Medical License */}
                <div className="mb-4">
                  <label htmlFor="medicalLicense" className="block text-sm font-medium text-gray-700">
                    Medical License
                  </label>
                  <p className="text-gray-700">{doctor?.medical_license}</p>
                </div>

                {/* University */}
                <div className="mb-4">
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                    University
                  </label>
                  <p className="text-gray-700">{doctor?.university}</p>
                </div>

                <div className="mb-4">
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                    Certificates  
                  </label>
                  <p className="text-gray-700">{doctor?.certificate_image}</p>
                </div>
               
              
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export component
export default ProfessionalDetails;
