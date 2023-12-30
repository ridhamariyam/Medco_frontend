import React, { useContext, useEffect, useState } from "react";
import Nav from './componnets/Nav';
import Sidebar from './componnets/Sidebar';
import AuthContext from "../AuthContext/Authcontext";
import axios from "axios";
import { baseUrl } from "../const/urls";

function ProfessionalEdit() {
  const [doctor, setDoctor] = useState(null);
  const { user } = useContext(AuthContext);
  const [certificates, setCertificates] = useState(null);

  const getDocProfDetail = () => {
    axios.get(`${baseUrl}/doctor/Professionaldetails/${user.user_id}`)
      .then(response => {
        const doctorData = response.data;
        console.log(doctorData)
        setDoctor(doctorData);
        setCertificates(doctorData.certificates);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };

  useEffect(() => {
    getDocProfDetail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('clinic_address', e.target.clinicAddress.value);
      formData.append('graduation_year', e.target.graduationYear.value);
      formData.append('medical_license', e.target.medicalLicense.value);
      formData.append('university', e.target.university.value);

      const response = await axios.patch(
        `${baseUrl}/doctor/Professionaldetails/${user.user_id}/`,
        formData
      );

      if (response.status === 200) {
        alert('Updated successfully');
      }
    } catch (error) {
      console.error('Error updating professional details:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  const handleFileUpload = (event) => {
    const selectedCertificates = Array.from(event.target.files).map(file => file.name);
    setCertificates(selectedCertificates);
  };

  return (
    <div>
      <Nav />
      <Sidebar />
      <div className="flex flex-col h-screen overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="flex h-full overflow-hidden">
            <div className="absolute right-0 top-10 w-4/5 h-3/4 bg-gray-100 px-6 py-12 border-l border-gray-200 overflow-y-auto">
              <div className="h-full">
                <div className="bg-white p-8 rounded-md shadow-md">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Edit Professional Details
                  </h2>

                  <div className="mb-6 border border-gray-300 p-4 rounded-md">
                    <label
                      htmlFor="clinic-address"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Clinic/Hospital Address
                    </label>
                    <input
                      id="clinic-address"
                      type="text"
                      name="clinicAddress"
                      defaultValue={doctor?.clinic_address}
                      placeholder="Eg: 123 Main St, City, Country"
                      className="input-field-lg" // Larger input field styling
                    />
                  </div>

                  <div className="mb-6 border border-gray-300 p-4 rounded-md">
                    <div className="w-full md:w-1/2">
                      <label
                        htmlFor="graduation-year"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Graduation Year
                      </label>
                      <input
                        id="graduation-year"
                        type="text"
                        name="graduationYear"
                        defaultValue={doctor?.graduation_year}
                        placeholder="Eg: 2005"
                        className="input-field-lg" // Larger input field styling
                      />
                    </div>
                  </div>

                  <div className="mb-6 border border-gray-300 p-4 rounded-md">
                    <label
                      htmlFor="medical-license"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Medical License
                    </label>
                    <input
                      id="medical-license"
                      type="text"
                      name="medicalLicense"
                      defaultValue={doctor?.medical_license}
                      placeholder="Eg: XYZ12345"
                      className="input-field-lg" // Larger input field styling
                    />
                  </div>

                  <div className="mb-6 border border-gray-300 p-4 rounded-md">
                    <label
                      htmlFor="university"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      University
                    </label>
                    <input
                      id="university"
                      type="text"
                      name="university"
                      defaultValue={doctor?.university}
                      placeholder="Eg: XYZ12345"
                      className="input-field-lg" // Larger input field styling
                    />
                  </div>

                  {/* <div className="mb-6 border border-gray-300 p-4 rounded-md">
                    <label
                      htmlFor="grid-certificates"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Certificates
                    </label>
                    <input
                      id="grid-certificates"
                      type="file"
                      onChange={handleFileUpload}
                      multiple
                    />
                   
                    {certificates && (
                      <div>
                        <p>Selected Certificates:</p>
                        <ul>
                          {certificates.map((certificate, index) => (
                            <li key={index}>{certificate}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div> */}

                  <div className="flex items-center justify-center">
                    <button
                      className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
                      type="submit"
                    >
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

export default ProfessionalEdit;
