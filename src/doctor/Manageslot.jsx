import React, { useState, useEffect } from "react";
import Nav from "./componnets/Nav";
import Sidebar from "./componnets/Sidebar";
import TimeSlot from "./componnets/TimeSlot";
import "react-datepicker/dist/react-datepicker.css";



function Manageslot() {
  const [nextDays, setNextDays] = useState([]);
  const [currentDayInfo, setCurrentDayInfo] = useState({
    day: "",
    date: 0,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState();
  const [successMessage, setSuccessMessage] = useState("");

  const getFormattedDate = (date) => {
    const inputDate = new Date(date);
    const formattedDate = inputDate.toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    console.log(selectedDate, "fffffffffffffhhffffffffff");
    setFormattedDate(getFormattedDate(selectedDate));
    console.log(formattedDate, "from manage");
  }, [selectedDate]);

  useEffect(() => {
    const today = new Date();
    const nextDaysArray = [];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);

      const day = {
        day: nextDay.toLocaleDateString("en-US", { weekday: "long" }),
        date: nextDay.getDate(),
      };

      nextDaysArray.push(day);
    }

    setNextDays(nextDaysArray);

    // Set current day information
    setCurrentDayInfo({
      day: nextDaysArray[0].day,
      date: nextDaysArray[0].date,
    });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const selectedDay = {
      day: date.toLocaleDateString("en-US", { weekday: "long" }),
      date: date.getDate(),
    };
    setCurrentDayInfo(selectedDay);
  };


  return (
    <>
      <Nav />
      <Sidebar />
      <div className="flex flex-col overflow-hidden">
        <div className="flex overflow-hidden">
          <div className="absolute right-0 top-0 w-4/5 h-full bg-gray-100 px-6 py-24 border border-gray-200 overflow-y-auto">
            <div className="h-screen bg-white p-6">
              <div className="flex bg-gray-100 shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-2 md:mx-12">
                <p className="text-left h-10 bg-gray-100 mt-5 md:mx-6  rounded ">
                  Select The Date:
                </p>
                {successMessage && (
                  <div className="bg-green-200 text-green-800 p-2 mt-2 rounded">
                    {successMessage}
                  </div>
                )}
                {nextDays.map((day, index) => (
                  <div
                    key={index}
                    className={`flex group hover:bg-blue-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 ${
                      index === 0 ? "content-center" : ""
                    } ${
                      selectedDate.getDate() === day.date ? "bg-blue-200" : ""
                    }`}
                    onClick={() =>
                      handleDateChange(new Date(selectedDate.setDate(day.date)))
                    }
                  >
                    <div className="flex items-center px-4 py-4">
                      <div className="text-center">
                        <p
                          className={`text-gray-900 group-hover:text-blue-900 text-sm transition-all duration-300 ${
                            selectedDate.getDate() === day.date
                              ? "font-bold"
                              : ""
                          }`}
                        >
                          {day.day}
                        </p>
                        <p
                          className={`text-gray-900 group-hover:text-blue-900 mt-3 group-hover:font-bold transition-all duration-300 ${
                            selectedDate.getDate() === day.date
                              ? "text-blue-900"
                              : ""
                          }`}
                        >
                          {index === 0 ? "Today" : day.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <TimeSlot formattedDate={formattedDate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manageslot;
