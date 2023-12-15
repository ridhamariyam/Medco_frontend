import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext/Authcontext";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Loginpage from "./main/Login";
import Signuppage_user from "./main/Signup";
import Homepage from "./main/Homepage";
import Doctorsignup from "./main/DoctorSignup";
import Doctor_homepage from "./doctor/Doctor_homepage";
import Admin_dashboard from "./Admin/Admin_dashboard";
import PrivateRouteDoctor from "./PrivateRoute/PrivateRouteDoctor";
import Otp from "./main/Otp";
import Admin_doctor from "./Admin/Admin_doctor";
import Doctor_view from "./Admin/Doctor_view";
import Finddoctors from "./patient/Finddoctors";
import ProfessionalDEtails from "./doctor/ProfessionalDEtails";
import ProfessionalEdit from "./doctor/ProfessionalEdit";
import Verified_doctor from "./Admin/Verified_doctor";
import Blockeddoctores from "./Admin/Blockeddoctores";
import Patientlist from "./Admin/Patientlist";
import About from "./patient/About";
import Chat from "./patient/Chat";
import Profile from "./doctor/Profile";
import Edit_Profile from "./doctor/Edit_Profile";
import BookDoctor from "./patient/BookDoctor";
import Manageslot from "./doctor/Manageslot";
import CheckoutForm from "./Checkout/CheckoutForm"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DoctorChat from "./doctor/componnets/DoctorChat";
import ListMySlots from "./doctor/ListMySlots";
import Appointements from "./patient/Appointements";




const stripePromise = loadStripe('pk_test_51OLRLZSAQZuiVDoMWXFhEU2cOPRyC3hXYiHPlzwqqG7KBgARBJukXxPY5cCnoVnGJSA36SpVUpAAePOjIZK9HI8d007i9py8O4');

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* <Route path="call" element={</>} /> */}
            <Route path="login" element={<Loginpage />} />
            <Route path="Signup_patient" element={<Signuppage_user />} />
            <Route path="verify" element={<Otp />} />

            {/* patient url */}
            <Route path="About" element={<About />} />
            <Route path="Find_doctors" element={<Finddoctors />} />
            <Route path="Chat/:username" element={<Chat  />} />
            <Route path="Chat" element={<Chat/>} />
            <Route path="Appointements" element={<Appointements />} />
            <Route path="BookDoctor/:id" element={<BookDoctor />} />
            
            
            
            {/* doctor url */}
            <Route path="Doctorsignup" element={<Doctorsignup/>} />
            <Route path="doctor_homepage" element={<PrivateRouteDoctor><Doctor_homepage/></PrivateRouteDoctor>} />
            <Route path="Edit_Profile" element={<Edit_Profile/>} />
            <Route path="Profile" element={<Profile/> }/>
            <Route path="Manageslot" element={<Manageslot/>}/>
            <Route path="ProfessionalDEtails" element={<ProfessionalDEtails/>}/>
            <Route path="ProfessionalEdit" element={<ProfessionalEdit/>}/>
            <Route path="DoctorChat" element={<DoctorChat/>}/>
            <Route path="DoctorChat/:username" element={<DoctorChat/>}/>
            <Route path="ListMySlots" element={<ListMySlots/>}/>
            


            {/* admin url */}
            <Route path="Admin_dashboard" element={<PrivateRoute><Admin_dashboard /></PrivateRoute>}/>
            <Route path="admin_doctor" element={<Admin_doctor />}/>
            <Route path="Blockeddoctores" element={<Blockeddoctores />}/>
            <Route path="Verified_Doctors" element={<Verified_doctor />}/>
            <Route path="Doctor_view/:id" element={<Doctor_view />}/>
            <Route path="Patientlist" element={<Patientlist />}/>

            {/* payments */}
            <Route path="payment" element={
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            } />

            
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
