import React, { useContext } from "react";
import Header from "./header";
import Footer from "./footer";
import { FaUserDoctor } from "react-icons/fa6";
import AuthContext from "../AuthContext/Authcontext";

const Homepage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <div
        className="hero h-50 "
        style={{ backgroundImage: "url('/image/bg.jpeg')" }}
      >
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md flex flex-col items-center justify-center h-screen">
            <h1 className="mb-5 text-5xl font-bold text-white">
              Stay at Home. Consult Doctors Online.
            </h1>
            <p className="mb-5 text-white">
              We Are Here to Hear and Heal Your Health Problems
            </p>
            <div className="mb-5 flex">
              <a
                href="/Find_doctors"
                className="bg-blue-500 text-white p-2 rounded-r transform transition-transform duration-300 ease-in-out hover:scale-105"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <br />

      <section className="bg-white border-bold border-spacing-1 mt-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 px-4">
          {renderFeature("Expert Doctors", "Our doctors are specialists in their respective fields, ensuring that you receive the highest level of care.", FaUserDoctor)}
          {renderFeature("Emergency Care", "Emergencies don't follow a schedule, and neither do we.", FaUserDoctor)}
          {renderFeature("24/7 Full Support", "Reliable 24/7 full support for seamless online doctor appointments", FaUserDoctor)}
        </div>
      </section>
      <br />
      <div className="bg-cover bg-center w-screen md:h-96" style={{ backgroundImage: "url('/image/bgg.jpeg')" }}>
        <div className="text-center">
          <br/><br/><br/>
          <h1 className="text-4xl font-bold text-teal-900 mt-4">24/7 Helpline Service</h1>
          <p className="text-xl text-gray-700 mt-4">
            Our helpline service is available 24/7 to assist you. 
            <br/>Feel free to reach out to us for any assistance or support you may need.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

const renderFeature = (title, description, Icon) => (
  <div className="p-5 border-t lg:border-none xl:border-none">
    <div className="p-5 flex">
      <div className="bg-gray-400 my-auto p-5 rounded-full">
        <Icon className="text-teal-900 text-4xl" />
      </div>
      <div className="ml-2 ">
        <div className="p-2">
          <h1 className="text-2xl font-sans text-teal-900 ">{title}</h1>
          <p className="text-lg font-sans text-teal-900">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Homepage;
