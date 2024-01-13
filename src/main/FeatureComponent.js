import React from "react";
import { FaUserDoctor } from "react-icons/fa6";

const FeatureComponent = ({ title, description }) => (
  <div className="p-5 border-t lg:border-none xl:border-none">
    <div className="p-5 flex">
      <div className="bg-gray-400 my-auto p-5 rounded-full">
        <FaUserDoctor className="text-teal-900 text-4xl" />
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

export default FeatureComponent;