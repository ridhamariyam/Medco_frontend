import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './componnets/Nav'
import Sidebar from './componnets/Sidebar'

const CreateRoom = () => {
    const [roomId, setRoomId] = useState()
    const navigate = useNavigate()

  return (
    <div>
      <Nav />
      <Sidebar />
      <div className="p-4 bg-dark m-96  border flex justify-center items-center">
        <input onChange={(e)=>setRoomId(e.target.value)}></input><br></br>
        <button onClick={()=>navigate(`/video/${roomId}`)}>join</button>
      </div>    
    </div>
  )
}

export default CreateRoom
