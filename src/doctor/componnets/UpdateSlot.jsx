import React from 'react'

function UpdateSlot() {
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg overflow-x-scroll">
    <p className="text-gray-700 group-hover:text-blue-900 mt-1 group-hover:font-bold transition-all duration-300 text-xs mr-[-4rem]">Select Available Slots:</p> 
  <div className="flex">
   
    <div className="h-16 bg-gray-100 rounded p-2 group hover:bg-blue-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-20">
   
      <div className="flex items-center">
        <div className="text-center ml-0.5">
          <p className="text-gray-700 group-hover:text-blue-900 mt-1 group-hover:font-bold transition-all duration-300 text-xs mr-[-4rem]">
            04:00-04:30 <br></br>PM
          </p>
        </div>
      </div>
    </div>

    <div className="h-16 bg-gray-100 rounded p-2 group hover:bg-blue-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-20">
      <div className="flex items-center">
        <div className="text-center ml-0.5">
          <p className="text-gray-700 group-hover:text-blue-900 mt-1 group-hover:font-bold transition-all duration-300 text-xs mr-[-4rem]">
            05:00-05:30 <br></br>PM
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Button Centered */}
  <div className="flex justify-center mt-4">
    <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300">
      Update Slot
    </button>
  </div>
</div>
);
}

export default UpdateSlot
