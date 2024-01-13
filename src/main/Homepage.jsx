import React, { useContext } from "react";
import Header from "./header";
import Footer from "./footer";
import FeatureComponent from "./FeatureComponent"; // Assuming this component is defined in a separate file
import { FaUserDoctor } from "react-icons/fa6";
import AuthContext from "../AuthContext/Authcontext";

const Homepage = () => {
  // Fetching user context using useContext
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />

      {/* Hero Section */}
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

      {/* Feature Section */}
      <FeatureSection />

      {/* Helpline Section */}
      <div className="bg-cover bg-center w-screen md:h-96" style={{ backgroundImage: "url('/image/bgg.jpeg')" }}>
        <div className="text-center p-8">
          <br/><br/>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-900 mt-4">24/7 Helpline Service</h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mt-4">
            Our helpline service is available 24/7 to assist you.
            <br />Feel free to reach out to us for any assistance or support you may need.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

// Feature Section Component
const FeatureSection = () => (
  <section className="bg-white border-bold border-spacing-1 mt-4 p-4 overflow-x-auto">
    <div className="flex flex-no-wrap space-x-4 px-4">
      {/* Features */}
      <FeatureComponent
        title="Expert Doctors"
        description="Our doctors are specialists in their respective fields, ensuring that you receive the highest level of care."
        Icon={FaUserDoctor}
      />
      <FeatureComponent
        title="Emergency Care"
        description="Emergencies don't follow a schedule, and neither do we."
        Icon={FaUserDoctor} // Assuming you want the same icon for each feature
      />
      <FeatureComponent
        title="24/7 Full Support"
        description="Reliable 24/7 full support for seamless online doctor appointments"
        Icon={FaUserDoctor} // Assuming you want the same icon for each feature
      />
    </div>
  </section>
);

export default Homepage;
