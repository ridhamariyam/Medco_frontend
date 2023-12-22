import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Walletcomponent from './components/Walletcomponent';
import axios from 'axios';
import { baseUrl } from '../const/urls';
import AuthContext from "../AuthContext/Authcontext";



function Wallet() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(`${baseUrl}/payments/Balance/${user?.user_id}/`);
        const data = response.data;
        setWalletBalance(data.balance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
        setError(error.response?.data?.error || 'Error fetching wallet balance');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletBalance();
  }, [user?.user_id]);

  return (
    <div>
      <Walletcomponent/>
      <div className='bg-white w-screen h-screen' style={{ marginTop: '-50px' }}>
        <div className='p-4 sm:ml-64 border mt-12'>
          <div className=''>
            <ul className='menu menu-horizontal'>
              <div className=''>
                <ul className='menu menu-horizontal'>
                  <img
                    src='image/logo12.png'
                    alt=''
                    style={{ width: '30px', height: 'auto', marginRight: '10px' }}
                  />
                  <li className='text-gray-700 font-bold'>
                    HealthCash Wallet Balance: {loading ? 'Loading...' : error ? 'Error' : `$${walletBalance}`}
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
  

export default Wallet;
