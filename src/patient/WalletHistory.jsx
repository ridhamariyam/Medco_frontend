import React, { useEffect } from "react";
import Walletcomponent from "./components/Walletcomponent";

function WalletHistory() {
  // const listAppointments = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/slot/ListAppointement`, {
  //       params: {
  //         date: selectedDate.toISOString(),
  //       },
  //     });
  //     setDetails(response.data);
  //   } catch (error) {
  //     console.error('Error fetching details', error);
  //   }
  // };

  // useEffect(() => {
    
  //     listAppointments();
   
  // }, []);

  
  return (
    <div>
      <Walletcomponent />

      <div className="bg-gray-100 w-screen h-screen" style={{ marginTop: "-50px" }}>
        <div className="sm:ml-58 mt-12">
          <div className="p-4 bg-white sm:ml-64 border">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2">Date</th>
                  <th className="border-b px-4 py-2">Amount</th>
                  <th className="border-b px-4 py-2">Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="py-4">
                  <td className="border-b px-4 py-2">2023-01-01</td>
                  <td className="border-b px-4 py-2">$100.00</td>
                  <td className="border-b px-4 py-2">$500.00</td>
                </tr>

               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletHistory;
