import React,{useContext} from "react";
import { Route, Navigate, useNavigate, Routes } from "react-router-dom";
import AuthContext from "../AuthContext/Authcontext";
import Admin_dashboard from "../Admin/Admin_dashboard";

const PrivateRoute = ({ element }) => {
  const  {user}  = useContext(AuthContext);
  console.log('User in PrivateRoute:', user);

  const isAuthenticated = user !== null && user.role === "admin";

  return isAuthenticated ? (
    <Admin_dashboard />
  ) : (
    <Navigate to="/" />
  );
};




export default PrivateRoute;