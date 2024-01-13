import React, {useState, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../AuthContext/Authcontext";

const Header = () => {
  const { user, logoutuser, itsdoctor, superuser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="bg-white text-grey shadow-lg">
    <div className="container mx-auto flex items-center justify-between py-2">
      {/* Hamburger icon for mobile menu */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2 focus:outline-none"
        >
          <svg
            className="h-6 w-6 text-gray-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div>
        <Link to="/">
          <img
            src="/image/logo.png"
            alt=""
            className="h-12 w-25 transition duration-300 ease-in-out"
          />
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white text-gray">
          <div className="p-4 w-48">
            {/* Logo */}
            <Link to="/">
              <img
                src="/image/logo.png"
                alt="Logo"
                className="h-12 w-32 mb-4"
              />
            </Link>

            {/* Close button (hamburger icon) */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-0 right-0 p-4 focus:outline-none"
            >
              {/* Cross icon */}
              <svg
                className="h-6 w-6 text-gray-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Menu items */}
            <Link to="/" className="block py-2">
              Consult Online
            </Link>
            <Link to="/Find_doctors" className="block py-2">
              Find Doctors
            </Link>
            <Link to="/" className="block py-2">
              Book Appointment
            </Link>
            <Link to="/" className="block py-2">
              HealthFeed
            </Link>
            {/* ... other mobile menu items */}
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="hidden lg:flex lg:items-center space-x-4">
        <Link to="/">Consult Online</Link>
        <Link to="/Find_doctors">Find Doctors</Link>
        <Link>Book Appointment</Link>
        {/* <details>
          <summary>Treatment</summary>
          <ul className="p-2 bg-white">
            <li><Link>Dentist</Link></li>
            <li><Link>Gynecologist/Obstetrician</Link></li>
            <li><Link>General Physician</Link></li>
            <li><Link>Dermatologist</Link></li>
            <li><Link>ENT</Link></li>
            <li><Link>Homeopath</Link></li>
            <li><Link>Ayurveda</Link></li>
          </ul>
        </details> */}
        <Link to="/">Health Feed</Link>
      </nav>

      {/* CTA Button */}
      <div className="hidden lg:flex lg:items-center">
        <Link
          to="/"
          className="btn bg-white text-black hover:bg-black hover:text-white"
        >
          Book Free Appointment
        </Link>
      </div>

      {/* User Dropdown */}
      <div>
        {user ? (
          <div className="dropdown dropdown-end">
            {/* ... your existing user dropdown code */}
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-white text-black hover:bg-black hover:text-white"
          >
            Login/Signup
          </Link>
        )}
      </div>
    </div>
  </header>
);
};


export default Header;
