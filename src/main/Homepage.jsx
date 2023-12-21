import React,{useContext} from "react";
import Header from "./header";
import Footer from "./footer";
import { FaUserDoctor } from "react-icons/fa6";
import { BsCheck2All } from "react-icons/bs";
import AuthContext from "../AuthContext/Authcontext";
import Finddoctors from "../patient/Finddoctors";
//----------------------------------------------

const Homepage = () => {

  const  {user}  = useContext(AuthContext);
  console.log(user)

  return (
    <>
      <Header />
      <div
        className="hero h-screen"
        style={{ backgroundImage: "url('/image/bg.jpeg')" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Stay at Home. Consult Doctors Online.
            </h1>
            <p className="mb-5">
              We Are Here to Hear and Heal Your Health Problems
            </p>

            <div className="mb-5 flex">
              <input
                type="text"
                placeholder="Search for doctors..."
                className="p-2 border border-gray-300 rounded-l w-full"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded-r"
              >
                Search
              </button>
            </div>
          </div>

        </div>
      </div>
      <br/>

      {/* =========== */}
      <section className="bg-white border border-spacing-1">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3  px-4">
          <div className="p-5">
            <div className="p-5 flex">
              <div className="bg-gray-400 my-auto p-5 rounded-full">
                <FaUserDoctor className="text-teal-900 text-4xl " />
              </div>
              <div className="ml-2 ">
                <div className="p-2">
                  <h1 className="text-2xl font-sans text-teal-900 ">
                    Expert Doctors{" "}
                  </h1>
                  <p className="text-lg font-sans text-teal-900   ">
                  Our doctors are specialists in their respective fields, ensuring that you receive the highest level of care .{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t lg:border-none xl:border-none ">
            <div className="p-5 flex">
              <div className="bg-gray-400 my-auto p-5 rounded-full">
                <FaUserDoctor className="text-teal-900 text-4xl " />
              </div>
              <div className="ml-2 ">
                <div className="p-2">
                  <h1 className="text-2xl font-sans text-teal-900 ">
                  Emergency Care {" "}
                  </h1>
                  <p className="text-lg font-sans text-teal-900   ">
                  Emergencies don't follow a schedule, and neither do we.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t lg:border-none xl:border-none ">
            <div className="p-5 flex">
              <div className="bg-gray-400 my-auto p-5 rounded-full">
                <FaUserDoctor className="text-teal-900 text-4xl " />
              </div>
              <div className="ml-2 ">
                <div className="p-2">
                  <h1 className="text-2xl font-sans text-teal-900 ">
                  24/7 Full Support {" "}
                  </h1>
                  <p className="text-lg font-sans text-teal-900   ">
                  Reliable 24/7 full support for seamless online doctor appointments{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br/>

    
      {/* <section> */}
        {/* <div className="grid grid-cols-2">
          <div className="flex  relative p-5 mt-5" style={{ height: "500px" }}>
            <div className="bg-purple-400 w-72 h-96 absolute left-16 rounded-2xl">
              <img
                src="https://askproject.net/meddic/wp-content/uploads/sites/156/2023/10/portrait-of-young-woman-doctor-at-hospital-corrido-SGSBYGP.jpg"
                alt=""
                className="w-full h-full object-cover rounded-2xl"
              />
            </div> */}

            {/* <div className=" flex absolute my-auto bg-white rounded-md px-3 py-2 top-80 left-28">
                <BsCheck2All />
                <p>Health Care Service </p>
            </div>
            
            <div className="bg-purple-400 w-72 h-96 absolute  left-96 top-24 rounded-2xl">
              <img
                src="https://askproject.net/meddic/wp-content/uploads/sites/156/2023/10/portrait-of-young-woman-doctor-at-hospital-corrido-SGSBYGP.jpg"
                alt=""
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div> */}

          {/* <div className="p-2">
            <div className="h-1/2 overflow-hidden  ">
              <div className="mt-7">
                <h1 className="py-3 px-5 font-mono text-blue-600 font-semibold text-lg">ABOUT MEDDIC</h1>
                <h1 className="py-2 px-5 text-5xl font-sans font-semibold ">We Collaborate for <br /> Better Healthcare.</h1>
                <p className="py-2 px-5 text-lg font-sans text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> Ut
                  elit tellus, luctus nec ullamcorper mattis.
                </p>
              </div>
            </div>
          
            <div className="flex gap-4 py-2 items-center">
              <div className="bg-white h-44 p-5">
                <h1 className="py-3 font-sans text-lg" >Our Vision</h1>
                <p className="font-sans text-lg font-thin">
                  We never get behind of the <br /> latest medical trends. Lorem <br /> ipsum
                  dolor sit, consectetur.
                </p>
              </div>
              <div className="bg-white h-44 p-5">
                <h1 className="py-3 font-sans text-lg" >Our Mission</h1>
                <p className="font-sans text-lg font-thin">
                We never get behind of the <br /> latest medical trends. Lorem <br /> ipsum
                  dolor sit, consectetur.
                </p>
              </div>
            </div>
            <div className="mt-2">
                <button className="bg-blue-600 py-2 px-6 rounded-3xl font-sans text-white">learn more</button>
            </div>
          </div>
        </div>
      </section> */}
      
      <Footer />
    </>
  );
};
export default Homepage;
