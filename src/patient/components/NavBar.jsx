import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RiChat1Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { CiViewTable } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import AuthContext from "../../AuthContext/Authcontext";


const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const user = true; 
  const {   
    logoutuser,
   
  } = useContext(AuthContext);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Your sidebar icon */}
                </svg>
              </button>
              <Link to="/admin/dashboard" className="flex ml-2 md:mr-24">
                <img src="/image/logo.png" className="h-8 mr-3" alt="" />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  {/* User profile dropdown */}
                  {user && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={toggleUserDropdown}
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="user photo"
                        />
                      </button>
                      {isUserDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-md">
                          <ul className="py-1" role="menu" aria-orientation="vertical">
                            <li>
                              <Link
                                to="/About"
                                onClick={toggleUserDropdown}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Profile
                              </Link>
                            </li>
                            <li>
                              <a
                                href="#"
                                onClick={toggleUserDropdown}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Settings
                              </a>
                            </li>
                            <li>
                              <button
                                onClick={logoutuser}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Aside Section */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto ">
          <ul className="space-y-2 font-medium">
            {/* Sidebar links */}
            <SidebarLink to="/About" icon={<CgProfile  size={20}/>} text="Profile" />
            <SidebarLink to="/Chat" icon={<RiChat1Line  size={20}/>} text="Chat" />
            {/* <SidebarLink
              to="/MedicalRecords"
              icon={<LiaNotesMedicalSolid  size={20}/>}
              text="Medical Records"
            /> */}
            <SidebarLink
              to="/Appointements"
              icon={<SlCalender size={20}/>}
              text="Appointment"
            />
           
            <SidebarLink to="/Wallet" icon={<BsCashCoin  size={20}/>} text="Payments" />
          </ul>
        </div>
      </aside>
    </>
  );
};

// Helper component for sidebar links
const SidebarLink = ({ to, icon, text }) => (
  <Link to={to}>
    <li className="flex items-center p-5 text-gray-900 rounded-lg  hover:bg-gray-100 group">
      {icon}
      <span className="flex-1 ml-3 whitespace-nowrap">{text}</span>
    </li>
  </Link>
);

export default NavBar;
