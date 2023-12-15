import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext/Authcontext';
import { Link } from 'react-router-dom';
import SideMenu from './components/SideMenu';
import Nav from './components/Nav';


const Admin_dashboard = () => {
 

 

  return (
    <div>
      <Nav/>
      <SideMenu/>
    </div>
  );
}

export default Admin_dashboard
