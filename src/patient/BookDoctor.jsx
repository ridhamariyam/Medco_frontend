import React, { useState,useEffect,useContext } from 'react';
import Header from '../main/header';
import Footer from '../main/footer';
import AuthContext from '../AuthContext/Authcontext';
import { baseUrl } from '../const/urls';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';





function BookDoctor() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [doctor, setDoctor] = useState({});
  const [nextDays, setNextDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDayInfo, setCurrentDayInfo] = useState({
    day: '',
    date: 0,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState('');
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const is_success = params.get('is_success');
    console.log(params, 'hhhhhhhhhhhhhh', is_success);
    if (is_success === 'true') {
      addBookData(params);
    }
  }, []);

  const addBookData = async (params) => {
    try {
      setLoading(true); // Set loading to true before making the request

      const date = params.get('date');
      const doctor = params.get('doctor');
      const timeChoice = params.get('time');
      const patient = user?.user_id;
      const mode = params.get('mode');
      const response = await axios.get(`${baseUrl}/slot/BookSlot?date=${date}&&doctor=${doctor}&&time=${timeChoice}&&patient=${patient}&&mode=${mode}`);

      if (response.status === 201) {
        availableSlots(selectedDate);
        console.log('Slot booked successfully!');
        setSuccessMessage('Slot booked successfully!');
      } else {
        console.log('Failed to book slot. Server response:', response);
      }
    } catch (error) {
      console.error('Error in booking slot:', error);
      if (error.response) {
        console.error('Error response from server:', error.response.data);
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes (either success or error)
    }
  };

  const getFormattedDate = (date) => {
    const inputDate = new Date(date);
    const formattedDate = inputDate.toISOString().split('T')[0];
    console.log(formattedDate, 'formatteddate');
    return formattedDate; 
  };

  useEffect(() => {
    console.log(selectedDate, 'fffffffffffffhhffffffffff');
    let formattedDate1 = getFormattedDate(selectedDate)
    console.log(formattedDate1, 'kjfskjbvksd');
    setFormattedDate(formattedDate1);
    return ()=>{
      setSlots([])
    }
  }, [selectedDate]);

  useEffect(() => {
    const today = new Date();
    const nextDaysArray = [];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);

      const day = {
        day: nextDay.toLocaleDateString('en-US', { weekday: 'long' }),
        date: nextDay.getDate(),
      };

      nextDaysArray.push(day);
    }

    setNextDays(nextDaysArray);

    setCurrentDayInfo({
      day: nextDaysArray[0].day,
      date: nextDaysArray[0].date,
    });
    availableSlots(selectedDate)
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const selectedDay = {
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.getDate(),
    };
    setCurrentDayInfo(selectedDay); 
    availableSlots(date);
  };
  

  const {id} =useParams()

  const getDocDetail = () => {
    axios.get(`${baseUrl}/doctor/Professionaldetails/${id}/`)
      .then(response => {
        const doctorData = response.data;
        console.log(doctorData, 'qqqquuyuuuqqqqqq')
        setDoctor(doctorData);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };
  

  useEffect(() => {
    getDocDetail()
    
  }, [id]);

  


  const availableSlots = async (selectedDate) => {
    let formData = new FormData();
    let formattedDate = getFormattedDate(selectedDate);
    formData.append('selectedDate', formattedDate);
  
    axios.post(`${baseUrl}/slot/availableslots/${id}/`, formData)
      .then(response => {
        const availableSlot = response.data;
        console.log(availableSlot, 'sdbfjksdbfks');
        setSlots(availableSlot);
      })
      .catch(error => {
        setSlots([])
        console.log(slots);
        console.error('Error fetching slot:', error);
      });
  };
  

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    console.log(slot, 'from handlesl'); 

  };

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
    console.log(selectedMode,'mode selectaaavnillata')
  };

  const bookSlot = async () => {
    const currentUrl = window.location.href;
    if (!user) {
      navigate('/login', {state:currentUrl});
      return;
    }
    if (!selectedSlot || !selectedMode) {
      console.log('Please select a slot/mode before booking.');
      return;
    }
      let price = doctor?.doctor?.fee
      const response = await axios.post(`${baseUrl}/payments/test-payment?price=${price}&&id=${selectedSlot.doctorr.account.id}&&mode=${selectedMode}&&date=${selectedSlot.date}&&time=${selectedSlot.time}&&doctor=${selectedSlot.doctorr.id}`,)
      console.log(response)
      if(response.data.url){
        
        window.location.href = response.data.url
        console.log('hihihihihi');
      }
      
      
   
    
  };
  
  useEffect(() => {
    console.log(selectedSlot, 'updated selectedSlot');
  }, [selectedSlot]);
  
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Header />
      <div
        className="w-full h-48  border border-blue-300"
        style={{
          backgroundImage: `url(/image/bg.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div className="flex justify-center rounded items-center mt-4">
          <input
            type="text"
            placeholder="Search by Name or Speciality"
            className="rounded border p-2 mr-2 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2">Search</button>
        </div>
      </div>
  
      <div className="flex px-4 bg-white h-screen">
        <div className="ml-32 border border-blue-300 p-4 shadow-md rounded-md mt-8 b-4 w-1/2 h-1/2 bg-white flex">
          <img src={baseUrl + doctor?.doctor?.account?.profile_image} alt="" className="w-32 h-32 object-cover rounded-md mb-2" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold mb-2">{doctor?.doctor?.account.first_name} {doctor?.doctor?.account.last_name}</h2>
            <p className="text-gray-700">{doctor?.doctor?.specialization}</p>
            <p>{doctor?.doctor?.qualification}</p>
            <p>{doctor?.doctor?.language}</p>
            <p>{doctor?.doctor?.experiance} years Experience</p>
            <p>{doctor?.doctor?.university}</p>
            <p>₹ {doctor?.doctor?.fee}</p>
            <p>{doctor?.doctor?.bio}</p>
          </div>
        </div>
  
        <div className="flex flex-col ml-4">
          <div className="my-4 mx-auto max-w-2xl bg-white p-4 rounded-md text-center h-5 w- 100">
               <div className='flex bg-white shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-2 md:mx-12 h-3/4'>
                
                {successMessage && (
                  <div className="bg-green-200 text-green-800 p-2 mt-2 rounded">
                    {successMessage}
                  </div>
                )}
                {nextDays.map((day, index) => (
                  <div
                    key={index}
                    className={`flex group hover:bg-blue-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 ${index === 0 ? 'content-center' : ''} ${selectedDate.getDate() === day.date ? 'bg-blue-200' : ''}`}
                    onClick={() => handleDateChange(new Date(selectedDate.setDate(day.date)))}
                  >
                    <div className='flex items-center px-4 py-4'>
                      <div className='text-center'>
                        <p className={`text-gray-900 group-hover:text-blue-900 text-sm transition-all duration-300 ${selectedDate.getDate() === day.date ? 'font-bold' : ''}`}>{day.day}</p>
                        <p className={`text-gray-900 group-hover:text-blue-900 mt-3 group-hover:font-bold transition-all duration-300 ${selectedDate.getDate() === day.date ? 'text-blue-900' : ''}`}>
                          {index === 0 ? 'Today' : day.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
  
          <div className=" max-w-md border border-blue-300 mx-auto mt-0 p-4 bg-white shadow-md rounded-lg overflow-x-scroll">
            <p>Select Available Slot:</p>
            <br></br>
            { slots.length != 0 ? (
            <div className="flex flex-wrap justify-between">
              
            {slots.map((slot, index) => (
                <div
                  key={index}
                  className={`h-16 bg-gray-100 rounded p-2 group rounded-lg mx-1 mb-2 overflow-hidden transition-all duration-300 cursor-pointer justify-center w-24 
                  ${selectedSlot?.time === slot.time ? 'bg-blue-100 shadow-lg light-shadow' : 'hover:bg-blue-100 hover:shadow-lg hover-light-shadow'}`}
                  onClick={() => handleSlotSelection(slot)}
                >
                  <div className="flex items-center">
                    <div className="text-center ml-[-1]">
                      <p className={`text-gray-700 transition-all duration-300 text-xs mr-[-4rem] ${selectedSlot?.time === slot.time ? 'text-blue-900 font-bold' : ''}`}>
                        <span className="inline-block max-w-full truncate">{slot.time}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>):<div className='text-red-700'>Slots not available on Selected Date</div>}
  
            <div className="mt-8">
              <p>Select Mode of Consultation:</p>
              <div className="flex justify-between mt-2">
                <div
                  className={`bg-gray-100 rounded p-2 group rounded-lg mx-1 mb-2 overflow-hidden transition-all duration-300 cursor-pointer justify-center w-24 
                  ${selectedMode === 'video' ? 'bg-blue-100 shadow-lg light-shadow' : 'hover:bg-blue-100 hover:shadow-lg hover-light-shadow'}`}
                  onClick={() => handleModeSelection('video')}
                >
                  <p className={`text-gray-700 transition-all duration-300 text-xs ${selectedMode === 'video' ? 'text-blue-900 font-bold' : ''}`}>Video Call</p>
                </div>
                <div
                  className={`bg-gray-100 rounded p-2 group rounded-lg mx-1 mb-2 overflow-hidden transition-all duration-300 cursor-pointer justify-center w-24 
                  ${selectedMode === 'clinic' ? 'bg-blue-100 shadow-lg light-shadow' : 'hover:bg-blue-100 hover:shadow-lg hover-light-shadow'}`}
                  onClick={() => handleModeSelection('clinic')}
                >
                  <p className={`text-gray-700 transition-all duration-300 text-xs ${selectedMode === 'clinic' ? 'text-blue-900 font-bold' : ''}`}>Clinic</p>
                </div>
                <div
                  className={`bg-gray-100 rounded p-2 group rounded-lg mx-1 mb-2 overflow-hidden transition-all duration-300 cursor-pointer justify-center w-24 
                  ${selectedMode === 'audio' ? 'bg-blue-100 shadow-lg light-shadow' : 'hover:bg-blue-100 hover:shadow-lg hover-light-shadow'}`}
                  onClick={() => handleModeSelection('chat')}
                >
                  <p className={`text-gray-700 transition-all duration-300 text-xs ${selectedMode === 'chat' ? 'text-blue-900 font-bold' : ''}`}>Chat</p>
                </div>
              </div>
            </div>
  
            <div className="flex justify-center mt-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300"onClick={bookSlot}>
                Book Slot
              </button>
             
            </div>
          </div>
        </div>
      </div>
  
      <Footer />
    </div>
  );
  
}

export default BookDoctor;
