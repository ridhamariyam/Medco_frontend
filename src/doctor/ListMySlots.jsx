import React from "react";
import Nav from "./componnets/Nav";
import Sidebar from "./componnets/Sidebar";

function ListMySlots() {
  return (
    <div>
      <Nav />
      <Sidebar />
      <div className="flex flex-col overflow-hidden">
        <div className="flex overflow-hidden">
          <div className="absolute right-0 top-0 w-4/5 h-full bg-gray-100 px-6 py-24 border border-gray-200 overflow-y-auto">
            <div className="h-screen bg-white p-6">
              <div className="flex bg-gray-100 shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-2 md:mx-12">
                <p className="text-left h-10 bg-gray-100 mt-5 md:mx-6  rounded ">
                  Selected Slots
                </p>
          </div>
        </div>
      </div>
    </div></div></div>
  );
}

export default ListMySlots;
