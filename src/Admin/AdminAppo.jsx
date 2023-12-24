import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SideMenu from './components/SideMenu';
import Nav from './components/Nav';
import { baseUrl } from '../const/urls';

function AdminAppo() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    listAppointments();
  }, []);

  const listAppointments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/slot/ListAppointement`);
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching details', error);
    }
  };

  const cancelAppointment = (appointmentId) => {
    // Implement cancellation logic
  };

  return (
    <div>
      <Nav />
      <SideMenu />
      <div className="p-16 bg-white sm:ml-64 border">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Patient</th>
              <th className="border px-4 py-2">Booked Time</th>
              <th className="border px-4 py-2">Booked Date</th>
              <th className="border px-4 py-2">Consultation Mode</th>
              <th className="border px-4 py-2">Status</th>
              
            </tr>
          </thead>
          <tbody>
            {details.map((appointment) => (
              <tr key={appointment.id} className="bg-gray-100">
                <td className="border px-4 py-2">{appointment?.doctor?.account?.first_name}</td>
                <td className="border px-4 py-2">{appointment?.patient?.account?.first_name}</td>
                <td className="border px-4 py-2">{appointment.time}</td>
                <td className="border px-4 py-2">{appointment.date}</td>
                <td className="border px-4 py-2">{appointment.mode}call</td>
                <td className={`border px-4 py-2 ${appointment.status === 'Canceled' ? 'text-red-500 font-bold' : ''}`}>
                  {appointment.status === 'Canceled' ? 'Canceled' : appointment.status}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAppo;
