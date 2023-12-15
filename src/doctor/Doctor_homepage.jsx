import React from 'react'
import Sidebar from './componnets/Sidebar';
import { Link } from 'react-router-dom';
import Nav from './componnets/Nav';


function Doctor_homepage() {
  return (
    <div >
        <Nav/>
        <Sidebar/>
        
    </div>
    
  )
}

export default Doctor_homepage
