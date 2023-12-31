import AuthContext from "../AuthContext/Authcontext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../const/urls";
import NavBar from "./components/NavBar";

function About() {
  const { patient, setPatient } = useContext(AuthContext);

  const [name, setName] = useState(patient?.account.first_name || "");
  const [age, setAge] = useState(patient?.age || "");
  const [bloodGroup, setBloodGroup] = useState(patient?.blood_group || "");
  const [gender, setGender] = useState(patient?.gender || "male");
  const [phone, setPhone] = useState(patient?.account.phone || "");

  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    // Check if patient data is available before setting the initial state
    if (patient) {
      setName(patient?.account.first_name || "");
      setAge(patient?.age || "");
      setBloodGroup(patient?.blood_group || "");
      setGender(patient?.gender || "male");
      setPhone(patient?.account.phone || "");
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${baseUrl}/patient/patient_details/${patient.id}`,
        {
          first_name: name,
          age,
          blood_group: bloodGroup,
          gender: capitalizeString(gender),
          phone,
        }
      );

      if (response.status === 200) {
        alert("Data updated successfully");

        // Update the patient data in the context
        setPatient((prevPatient) => ({
          ...prevPatient,
          account: { ...prevPatient.account, first_name: name, phone },
          age,
          blood_group: bloodGroup,
          gender,
        }));
      }
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };
  return (
    <>
      <NavBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg  mt-14">
          {/*  */}
          <div className="p-6 rounded-lg shadow-md max-w-md w-3/4 h-full left-0">
            <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter Name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-600"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter age"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="bloodGroup"
                  className="block text-sm font-medium text-gray-600"
                >
                  Blood Group
                </label>
                <input
                  type="text"
                  id="bloodGroup"
                  name="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter blood group"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="sex"
                  className="block text-sm font-medium text-gray-600"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}

export default About;
