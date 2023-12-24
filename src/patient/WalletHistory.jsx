import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../const/urls";
import Walletcomponent from "./components/Walletcomponent";

function WalletHistory() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAppointments();
  }, []);

  const listAppointments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/slot/ListAppointement`);
      setDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching details', error);
      setLoading(false);
    }
  };

  return (
    <div>
        <Walletcomponent /><br/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white w-2/3 h-screen mx-auto" style={{ marginTop: "-50px" }}>
          <div className="sm:ml-58 mt-12">
            <div className="p-4 bg-gray-100 rounded-lg sm:ml-64 border mt-16">
              <h2 className="text-3xl font-semibold mb-4 text-indigo-800">Payment History</h2>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-indigo-200">
                    <th className="border-b px-4 py-2 text-indigo-800">Date</th>
                    <th className="border-b px-4 py-2 text-indigo-800">Time</th>
                    <th className="border-b px-4 py-2 text-indigo-800">Closing Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((appointment, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border-b px-4 py-2">{appointment.date}</td>
                      <td className="border-b px-4 py-2">{appointment.time}</td>
                      <td className="border-b px-4 py-2 text-green-500">₹{appointment?.doctor?.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletHistory;
