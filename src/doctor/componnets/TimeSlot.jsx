// TimeSlot.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { baseUrl } from '../../const/urls';
import AuthContext from '../../AuthContext/Authcontext';
import SuccessModal from '../../main/Alert/Success';

function TimeSlot({ formattedDate }) {
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [createdSlots, setCreatedSlots] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useContext(AuthContext);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  
  console.log(formattedDate);
  const fetchAllSlots = () => {
    const today = new Date();
    let formData = new FormData();
    formData.append('date', formattedDate);
    formData.append('account', user.user_id);
    let url = ''
    if(today.toISOString().split("T")[0] === formattedDate){
      url = `${baseUrl}/slot/LIstSlotByTime/?date=${formattedDate}&account=${user.user_id}`
    }else{
      url = `${baseUrl}/slot/listallslot/?date=${formattedDate}&account=${user.user_id}`
    }
    axios.get(url, formData)
      .then(response => {
        const doctorData = response.data;
        console.log(doctorData);
        setSlots(doctorData.avalailable_slot);
        setCreatedSlots(doctorData.selected_slot)
      })
      .catch(error => {
        console.error('Error fetching slots:', error);
      });
  };

  const createSlot = async () => {
    try {
      if (createdSlots.length === slots.length){
        setSuccessMessage('No more Slots');
        setIsSuccessModalOpen(true);
        return
      }
      let formData = new FormData();
      let timeChoice = [];
      selectedSlots.forEach((slot) => {
        timeChoice.push(slots[slot]);
      });
      console.log(timeChoice, 'timechoice');
      formData.append('date', formattedDate);
      formData.append('timeChoice', JSON.stringify(timeChoice));
      formData.append('account', user.user_id);

      const response = await axios.post(`${baseUrl}/slot/createslot/`, formData);

      // Handle the response as needed
      console.log('Response:', response.data);
      setSuccessMessage('Slot added successfully!');
      setIsSuccessModalOpen(true);
      fetchAllSlots();
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      setSuccessMessage('Failed to add slot.Please try again.');
    }
  };

  useEffect(() => {
    fetchAllSlots();
    return () => {
      setSelectedSlots([]);
      setSuccessMessage('');
    };
  }, [formattedDate]);

  const toggleSlotSelection = (index) => {
    const isSelected = selectedSlots.includes(index);

    if (isSelected) {
      setSelectedSlots(selectedSlots.filter((selectedIndex) => selectedIndex !== index));
    } else {
      setSelectedSlots([...selectedSlots, index]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg overflow-x-scroll">
      <p>Select Available Slot:</p>
      <br></br>
      <div className="flex flex-wrap justify-between">
        {slots?.map((slot, index) => (
          <div
            key={index}
            className={`h-16 bg-gray-100 rounded p-2 group rounded-lg mx-1 mb-2 overflow-hidden transition-all duration-300 cursor-pointer justify-center w-24 ${createdSlots.includes(index) ? 'bg-red-500' :
              selectedSlots.includes(index) ? 'bg-green-100' : 'hover:bg-blue-100 hover:shadow-lg hover-light-shadow'
            }`}
            onClick={() =>createdSlots.includes(index) ? '' : toggleSlotSelection(index)}
          >
            <div className="flex items-center">
              <div className="text-center ml-[-1]">
                <p className={`text-gray-700 transition-all duration-300 text-xs mr-[-4rem] ${selectedSlots.includes(index) ? 'text-blue-900 font-bold' : ''}`}>
            
                  <span className="inline-block max-w-full truncate">{slot}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    
    
      {/* Success Modal */}
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} message={successMessage} />

      {/* Button Centered */}
      <div className="flex justify-center mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300" onClick={createSlot}>
          Add Slot
        </button>
      </div>
    </div>
  );
}

export default TimeSlot;
