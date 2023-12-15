import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import NavBar from "./components/NavBar";
import { baseUrl } from "../const/urls";

function Appointments() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      listAppointments();
    }
  }, [selectedDate]);

  const listAppointments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/slot/ListAppointement`, {
        params: {
          date: selectedDate.toISOString(),
        },
      });
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching details', error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      // Make a DELETE request to cancel the appointment
      await axios.patch(`${baseUrl}/slot/cancel_appointment/${appointmentId}/`);
      
      // Update the UI by removing the canceled appointment from the state
      setDetails(details.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error cancelling appointment', error);
    }
  };
  

  return (
    <div>
      <NavBar />
      <div className="p-4 bg-white sm:ml-64 border">
        <div className="p-4 rounded-lg bg-gray-300 dark:border-yellow-700 mt-14">
          <div className="bg-white p-4 rounded-md">
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
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
      {selectedDate && details.length > 0 && (
        <div className="p-4 bg-white sm:ml-64 border">
           <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">Doctor</th>
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
            <td className="border px-4 py-2">{appointment?.doctor?.account?.first_name}</td>
            <td className="border px-4 py-2">{appointment.time}</td>
            <td className="border px-4 py-2">{appointment.date}</td>
            <td className="border px-4 py-2">{appointment.mode}call</td>
            <td className="border px-4 py-2">
              {appointment.status === "Canceled" ? (
                <span className="text-red-500 font-bold">Canceled</span>
              ) : (
                appointment.status
              )}
            </td>
            <td className="border px-4 py-2">
              {appointment.status !== "Canceled" && (
                <button
                  onClick={() => cancelAppointment(appointment.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
      )}
    </div>
  );
}

export default Appointments;
