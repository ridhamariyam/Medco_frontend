import React from 'react';

function ListBookedSlot() {
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-blue-100 shadow-md rounded-lg overflow-x-scroll">
      <div className="flex flex-col overflow-y-auto">
        <div className="md:py-8 py-5 md:px-16 px-5 dark:bg-white bg-gray-50 rounded-b">
          <div className="px-4">
            <div className="border-b pb-4 border-gray-400 border-dashed">
              <p className="text-xs font-light leading-3 text-gray-700 dark:text-gray-700">9:00 AM</p>
              <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-700 mt-2">Zoom call with design team</a>
              <p className="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-700">Discussion on UX sprint and Wireframe review</p>
            </div>
            <div className="border-b pb-4 border-gray-900 border-dashed pt-5">
              <p className="text-xs font-light leading-3 text-gray-900 dark:text-gray-700">10:00 AM</p>
              <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-700 mt-2">Orientation session with new hires</a>
            </div>
            <div className="border-b pb-4 border-gray-400 border-dashed pt-5">
              <p className="text-xs font-light leading-3 text-gray-900 dark:text-gray-700">9:00 AM</p>
              <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-600 mt-2">Zoom call with design team</a>
              <p className="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-700">Discussion on UX sprint and Wireframe review</p>
            </div>

            <div className="flex justify-center mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300">
          New Button
        </button>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBookedSlot;
