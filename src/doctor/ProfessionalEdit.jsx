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

      const certificatesInput = e.target.querySelector('#grid-certificates');
      for (let i = 0; i < certificatesInput.files.length; i++) {
        formData.append('certificates', certificatesInput.files[i]);
      }

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
    <div className="flex flex-col overflow-hidden">
      <form onSubmit={handleSubmit}>
          <div className="flex overflow-hidden">
            <div className="absolute right-0 top-0 w-4/5 h-full bg-gray-100 px-6 py-24 border border-gray-200 overflow-y-auto">
              <div className="h-full">
                <div className="bg-white shadow-md rounded px-8 pt-2 pb-4 mb-3 flex flex-col my-2">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <div className="mt-8 mb-12">
                      <h2 className="text-3xl font-bold text-gray-700 tracking-wide leading-tight underline">
                        EDIT PROFESSIONAL DETAILS
                      </h2>
                      {/* Certificates */}
                      <div className="md:w-1/2 px-3">
                        <label htmlFor="grid-certificates" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                          Certificates
                        </label>
                        <input
                          id="grid-certificates"
                          type="file"
                          name="certificates"
                          multiple
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                          onChange={handleFileUpload}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Select multiple PDF files for certificates (hold Ctrl/Cmd while selecting).
                        </p>
                        <p className="text-l bold text-gray-800 mt-2">
                          Selected Certificates: {certificates && certificates.join(', ')}
                        </p>
                      </div>
  
                      {/* Address of Clinic/Hospital */}
                      <div className="md:w-1/2 px-3">
                        <label
                          htmlFor="grid-clinic-address"
                          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        >
                          Clinic/Hospital Address
                        </label>
                        <input
                          id="grid-clinic-address"
                          type="text"
                          name="clinicAddress"
                          defaultValue={doctor?.clinic_address}
                          placeholder="Eg: 123 Main St, City, Country"
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        />
                      </div>
                    </div>
  
                    <div className="-mx-3 md:flex mb-2">
                      {/* Graduation Year */}
                      <div className="md:w-1/2 px-3">
                        <label
                          htmlFor="grid-graduation-year"
                          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        >
                          Graduation Year
                        </label>
                        <input
                          id="grid-graduation-year"
                          type="text"
                          name="graduationYear"
                          defaultValue={doctor?.graduation_year}
                          placeholder="Eg: 2005"
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        />
                      </div>
  
                      {/* Medical License */}
                      <div className="md:w-1/2 px-3">
                        <label
                          htmlFor="grid-medical-license"
                          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        >
                          Medical License
                        </label>
                        <input
                          id="grid-medical-license"
                          type="text"
                          name="medicalLicense"
                          defaultValue={doctor?.medical_license}
                          placeholder="Eg: XYZ12345"
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        />
                      </div>
                    </div>
  
                    <div className="md:w-1/2 px-3">
                      <label
                        htmlFor="grid-medical-license"
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      >
                        University
                      </label>
                      <input
                        id="grid-medical-license"
                        type="text"
                        name="university"
                        defaultValue={doctor?.university}
                        placeholder="Eg: XYZ12345"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      />
                    </div>
  
                    <div className="flex items-center justify-center">
                      <button
                        className="btn bg-defaultBtnColor h-10 w-20 bg-blue-400 hover:bg-blue-500 text-white"
                        type="submit"
                      >
                        EDIT
                      </button>
                    </div>
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