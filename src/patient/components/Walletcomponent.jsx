import React, { useState } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

function Walletcomponent() {
    const [activeLink, setActiveLink] = useState(null);
    

    const handleLinkClick = (index) => {
      setActiveLink(index);
    };
  
    return (
      <div>
        <NavBar />
        <div className="p-4 sm:ml-64 border mt-12 ">
          <div className="">
            <ul className="menu menu-horizontal">
              <li className={activeLink === 0 ? 'text-blue-400 underline ' : ''}>
                <Link to='/Wallet' onClick={() => handleLinkClick(0)}>
                  HealthCash Balance
                </Link>
              </li>
              <li className={activeLink === 1 ? 'text-blue-400 underline' : ''}>
                <Link to='/WalletHistory' onClick={() => handleLinkClick(1)}>
                  HealthCash History
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
  </div>
  
        
     
    );
  }
export default Walletcomponent
