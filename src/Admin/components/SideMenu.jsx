import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiStethoscope } from "react-icons/gi";
import { LuPieChart } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { RiBuilding3Line } from "react-icons/ri";

const SideMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/Admin_dashboard"}
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
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/dashboard"}
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
                  Appointements
                </span>
                
              </Link>
            </li>
            <li className="w-full dropdown">
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <Link to="/Verified_Doctors" className="text-gray-500 ">Verified Doctors</Link>
              </li>
                <li>
                <Link to="/Blockeddoctores" className="text-gray-500 ">Blocked Doctors</Link>
                </li>
                <li>
                <Link to="/admin_doctor" className="text-gray-500 ">All Doctors</Link>
                </li>
              </ul>
              <Link
                to={"#"}
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group "
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                ></svg>
                <img
                  src="/image/doctor.ico"
                  alt=""
                  className="w-7 h-7 bg-gray-10 mr-4 -ml-6"
                />

                <span className="flex-1 whitespace-nowrap -ml-2">Doctors</span>

                
              </Link>
            </li>
            
            <li>
              <Link
                to={"/Patientlist"}
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                ></svg>
                <img
                  src="/image/patient.ico"
                  alt=""
                  className="w-7 h-7 bg-gray-10 mr-4 -ml-6"
                />

                <span className="flex-1 ml-3 whitespace-nowrap -ml-2">
                  Patient
                </span>

                
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/dashboard"}
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                ></svg>
                <img
                  src="/image/payment.ico"
                  alt=""
                  className="w-7 h-7 bg-gray-10 mr-4 -ml-6"
                />

                <span className="flex-1 ml-3 whitespace-nowrap -ml-2">
                  Payment
                </span>

                
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
