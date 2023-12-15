import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../const/urls';
import Nav from './components/Nav';
import SideMenu from './components/SideMenu';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [blocked, setBlocked] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/patient/patientSearch/?search=${searchTerm}`
      );
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    axios.get(`${baseUrl}/patient/patientlist`)
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => { 
        console.error('Error fetching patients:', error);
      });
  }, [blocked]);

  // Block user
  const blockUser = async (id) => {
    try {
      const response = await axios.post(`${baseUrl}/patient/Block_user/${id}/`, {});
  
      if (response.status === 200) {
        setBlocked(true);
      } else {
        console.error('Unable to Block User');
      }
    } catch (error) {
      console.error('Unable to block:', error);
    }
  };

  // Unblock user
  const unblockUser = async (id) => {
    try {
      const response = await axios.post(`${baseUrl}/patient/Unblock_user/${id}/`, {});

      if (response.status === 200) {
        setBlocked(false);
      } else {
        console.error('Unable to Unblock User');
      }
    } catch (error) {
      console.error('Unable to unblock:', error);
    }
  };
  return (
    <>
      <Nav />
      <SideMenu />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
          <div className="grid">
            <div className="flex rounded items-center bg-gray-100 h-16 justify-between">
              <h1 className="text-start font-bold ml-5 font-sans text-gray-600 text-2xl">
                Patient Management
              </h1>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search Patient"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded border border-gray-400 p-2 mr-2"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto rounded-lg">
            <table className="min-w-full border-none text-left">
              <thead>
                <tr className="border-gray-400 bg-gray-200 font-sans text-sm font-normal text-gray-600">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Gender</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Registered Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="font-sans text-sm">
                    <td className="px-4 py-2">{patient.id}</td>
                    <td className="px-4 py-2">
                      {patient?.account.first_name} {patient?.account.last_name}
                    </td>
                    <td className="px-4 py-2">{patient?.gender}</td>
                    <td className="px-4 py-2">{patient?.age}</td>
                    <td className="px-4 py-2">{patient?.account.email}</td>
                    <td className="px-4 py-2">{patient?.account.date_joined}</td>
                    <td className="px-4 py-2">
                      <button
                        className={
                          patient.account.is_active
                            ? 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                            : 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                        }
                        onClick={() =>
                          patient.account.is_active
                            ? blockUser(patient.id)
                            : unblockUser(patient.id)
                        }
                      >
                        {patient.account.is_active ? 'Block' : 'Unblock'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full flex items-center justify-end mt-4">
            <button className="bg-gray-500 text-white px-4 py-1 rounded-md mr-2">
              Previous
            </button>
            <button className="bg-gray-500 text-white px-4 py-1 rounded-md">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientList;
