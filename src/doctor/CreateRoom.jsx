import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './componnets/Nav'
import Sidebar from './componnets/Sidebar'
import { baseUrl } from '../const/urls'



  
const CreateRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [emailId, setEmailid] = useState('');
  const navigate = useNavigate();

  const mainStyle = {
    flex: '1',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundImage: ` url('/image/ggg.jpg')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundColor: '#FAFAFA',
  };

  const handleJoinClick = () => {
    // Validate email and room ID before proceeding
    if (!roomId || !emailId) {
      // Add your validation logic here
      console.error('Room ID and Email are required.');
      return;
    }

   
    // const mailtoLink = `mailto:${emailId}?subject=Join Room&body=Click on the following link to join the room: ${window.location.protocol + '//' +window.location.host}/video/${roomId}`;

    const mailtoLink = `mailto:${emailId}?subject=Join Room&body=Click on the following link to join the room: ${window.location.protocol}//${window.location.host}/video/${roomId}`;


    // Open the default email client
    window.open(mailtoLink);

    // Alternatively, if you want to navigate to the video page after sending the email, you can use the following line
    navigate(`/video/${roomId}`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-blue-500">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Nav />
        <main style={mainStyle}>
          <div className="p-48">
            <div className="max-w-md ml-28 mx-3/4 bg-transparent border rounded-md p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Create a Room</h2>
              <div className="mb-4">
                <label htmlFor="roomId" className="block text-sm font-medium text-gray-600">
                  Room ID
                </label>
                <input
                  type="text"
                  id="roomId"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter Room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
                <label htmlFor="roomId" className="block text-sm font-medium text-gray-600">
                  Patient Email Id
                </label>
                <input
                  type="text"
                  id="emailId"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter Patient Email"
                  value={emailId}
                  onChange={(e) => setEmailid(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                onClick={handleJoinClick}
              >
                Join
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateRoom
