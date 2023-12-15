import React,{useContext} from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext/Authcontext";
import Doctor_homepage from "../doctor/Doctor_homepage";


const PrivateRouteDoctor = ({ element }) => {
  const  {user}  = useContext(AuthContext);
  console.log('User in PrivateRoute:', user);

  const isAuthenticated = user !== null && user.role === "Doctor";

  return isAuthenticated ? (
    <Doctor_homepage />
  ) : (
    <Navigate to="/" />
  );
};



export default PrivateRouteDoctor;