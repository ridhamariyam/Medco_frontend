import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { baseUrl } from "../const/urls";

import Sidebar from "./componnets/Sidebar";
import Nav from "./componnets/Nav";



const List_Appointement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [details, setDetails] = useState([]);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/doctor/List_Appointement`, {
        params: {
          date: selectedDate.toISOString(),
        },
      });
      console.log(response.data, 'j6');
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching details', error);
    }
  };

  useEffect(() => {
    // Call the asynchronous function
    fetchAppointmentDetails();
  }, [selectedDate]);

  // const handleStatusChange = async (appointmentId, newStatus) => {
  //   try {
      
  //     await axios.put(`${baseUrl}/slot/updateStatus/${appointmentId}/`, { status: newStatus });
  //     fetchAppointmentDetails();
  //   } catch (error) {
  //     console.error('Error updating status', error);
  //   }
  // };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      if (newStatus === 'refund') {
        // If the new status is 'refund', make a request to initiate the refund
        await axios.post(`${baseUrl}/payments/HandleRefund/${appointmentId}/`);
      } else {
        // If the new status is something else, update the status as usual
        await axios.put(`${baseUrl}/slot/updateStatus/${appointmentId}/`, { status: newStatus });
      }
      
      // Fetch the updated appointment details after the change
      fetchAppointmentDetails();
    } catch (error) {
      console.error('Error updating status or initiating refund', error);
    }
  };

  return (
    <div>
      <Nav />
      <Sidebar />
      <div className="p-4 bg-white sm:ml-64 border">
        {/* Date Picker */}
        <div className="p-4 rounded-lg bg-gray-300 dark:border-yellow-700 mt-14">
          <div className="bg-white p-4 rounded-md">
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                {/* Add your date icon or other elements here */}
              </div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MM/dd/yyyy"
                className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholderText="Select date"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details Table */}
      <div className="p-4 bg-white sm:ml-64 border">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Patient</th>
              <th className="border px-4 py-2">Booked Time</th>
              <th className="border px-4 py-2">Booked Date</th>
              <th className="border px-4 py-2">Consultation Mode</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {details.map((appointment) => (
              <tr key={appointment.id}>
                <td className="border px-4 py-2">{appointment?.patient?.account?.first_name}</td>
                <td className="border px-4 py-2">{appointment.time}</td>
                <td className="border px-4 py-2">{appointment.date}</td>
                <td className="border px-4 py-2">{appointment.mode}</td>
                <td className="border px-4 py-2">
    {appointment.status === "Canceled" || appointment.status === "missed" ? (
      <span className="text-red-500 font-bold">{appointment.status}</span>
    ) : appointment.status === "completed" ? (
      <span className="text-green-500 font-bold">{appointment.status}</span>
    ) : (
      <span className="text-blue-500 font-bold">{appointment.status}</span>
    )}
  </td>

  {/* Display the dropdown list for changing status */}
  <td className="w-30 h-30 border px-4 py-2 rounded">
  {(appointment.status === "Canceled" || appointment.status === "Confirmed") && (
    <select
      className="block w-full bg-white border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
      onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
    >
      {appointment.status === "Canceled" && (
        <>
          <option>Select</option>
          <option value="refund">Refund</option>
        </>
      )}
      {appointment.status === "Confirmed" && (
        <>
          <option>Select</option>
          <option value="missed">
  Missed
</option>
          <option value="completed">Completed</option>
        </>
      )}
    </select>
  )}
</td>

</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default List_Appointement
