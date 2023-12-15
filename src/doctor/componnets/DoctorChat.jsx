import React from 'react'

import Nav from './Nav'
import Sidebar from './Sidebar'
import ChatDoccomponent from './Chatdoc'

function DoctorChat() {
  return (
    <div>
        <Nav/>
        <Sidebar/>
        <ChatDoccomponent/>
    </div>
  )
}

export default DoctorChat
