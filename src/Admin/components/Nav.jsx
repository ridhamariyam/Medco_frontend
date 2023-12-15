import React, { useContext, useState } from 'react';
import AuthContext from '../../AuthContext/Authcontext';


function Nav() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const {   
    logoutuser,
   
} = useContext(AuthContext);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-20">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={handleDropdownToggle}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* ... (your SVG path) */}
                </svg>
              </div>
              <a href="/admin/dashboard" className="flex ml-2 md:mr-24">
                <img src="/image/logo.png" className="h-8 mr-3" alt="" />
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div className="relative">
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={handleDropdownToggle}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                  {/* Dropdown content */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      {/* Dropdown items */}
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </a>
                      <a onClick={logoutuser} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Logout
                      </a>
                      {/* Add more items as needed */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
