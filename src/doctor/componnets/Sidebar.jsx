
import { Link } from "react-router-dom";
// import { GiStethoscope } from "react-icons/gi";
// import { LuPieChart } from "react-icons/lu";
// import { FaUserDoctor } from "react-icons/fa6";
// import { RiBuilding3Line } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { SlCalender } from "react-icons/sl";  
// import { CiChat1 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { LiaNotesMedicalSolid } from "react-icons/lia";
// import { SlCalender } from "react-icons/sl";
import { CiViewTable } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import { RiChat1Line } from "react-icons/ri";


import axios from "axios";
import { baseUrl } from "../../const/urls";


const Sidebar = () => {
  // State for sidebar toggle and doctors list
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 

  // Sidebar toggle function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
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
            <SidebarLink to="/Profile" icon={<CgProfile size={20} />} text="Profile" />
            <SidebarLink to="/ProfessionalDEtails" icon={<RiChat1Line size={20} />} text="Professional Details" />
            <SidebarLink
              to="/ProfessionalEdit"
              icon={<LiaNotesMedicalSolid size={20} />}
              text="Edit Profesional Details"
            />
            <SidebarLink to="/Manageslot" icon={<SlCalender size={20} />} text="Manage slot" />
            
            <SidebarLink to="/List_Appointement" icon={<SlCalender size={20} />} text="Appointements" />
            <SidebarLink
              to="/DoctorChat"
              icon={<CiViewTable size={20} />}
              text="Chat"
            />
            <SidebarLink to="/Payments" icon={<BsCashCoin size={20} />} text="Payments" />
            <SidebarLink to="/createroom" icon={<BsCashCoin size={20} />} text="video call" />
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

export default Sidebar;



 {/* <aside

          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200 sm:translate-x-0 `}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to={`/Profile`}
                  className="flex items-center p-2 text-gray-900 rounded-lg  group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    {LuPieChart}
                  </svg>
                  <span className="ml-3">Profile</span>
                </Link>
              </li>

              <li className="w-full dropdown">
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                  <li>
                    <Link to="/ProfessionalEdit" className="text-gray-500">
                      Edit Proffesional Details
                    </Link>
                  </li>
                </ul>
                <Link
                  to={"/ProfessionalDEtails"}
                  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75group-hover:text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <GiStethoscope size={20} />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Professional Details
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
                    3
                  </span>
                </Link>
              </li>

              <li className="w-full dropdown">
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                <Link
                  to={"/Manageslot"}
                  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                 
                  Add Slot
                  <span className="flex-1 ml-3 whitespace-nowrap"></span>
                </Link>
              </li>
             
              
                </ul>
                <Link
                  to=''
                  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <img
                    src="/image/table.png"
                    alt=""
                    className="w-5 h-5 bg-gray-10 mr-5 -ml-1"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">Slots</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
                    3
                  </span>
                </Link>
              </li>

              
              <li>
                <Link
                  to={"/CalenderDoc"}
                  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <SlCalender />
                  <span className="flex-1 ml-3 whitespace-nowrap -ml-2">
                    My Calendar
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
                    3
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/dashboard"}
                  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <img
                    src="/image/payment.ico"
                    alt=""
                    className="w-7 h-7 bg-gray-10 mr-4 -ml-2"
                  />
                  <span className="whitespace-nowrap">Payment</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/DoctorChat"}
                  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <CiChat1 size={20}/>
                  <span className="flex-1 ml-3 whitespace-nowrap -ml-2">
                    Chat
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
                    3
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside> */}