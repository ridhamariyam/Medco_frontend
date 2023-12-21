import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { baseUrl } from "../const/urls";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {
    const [doctor, setdoctor] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwtDecode(localStorage.getItem('authTokens'))
            : null
    );
    let navigate = useNavigate();
    let [authToken, setauthToken] = useState(() =>
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null
    );
    let [user, setuser] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwtDecode(localStorage.getItem('authTokens'))
            : null
    );
    let [is_superuser, setIsSuperuser] = useState(false);
    const [itsdoctor, setItsdoctor] = useState("False");
    let [superuser, setsuperuser] = useState("False");

    const handledoctorlogin = () => {
        setItsdoctor('True');
    };

    const [patient, setpatient] = useState(null);
    const [location, setLocation] = useState(null);

   useEffect(() => {
    if (user && user.role === 'user'){
        console.log(user,'12121')
        axios.get(`${baseUrl}/patient/patient_details/${user?.user_id}`)
        .then(response => {
            setpatient(response.data);
        })
        .catch(error => { 
            console.error('Error fetching patient:', error);
        });
    }
}, [user]);


    let userlogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
       
        // const role = e.target.role.value;
        let url;

        if (superuser === 'True') {
            url = `${baseUrl}/medcoapp/login/`;
        } else {
            url =
                itsdoctor === "False"
                    ? `${baseUrl}/medcoapp/login/`
                    : `${baseUrl}/medcoapp/login/`;
        }
    
        try {
            const response = await axios.post(url, {
                email: email,
                password: password,
                username : email,
                
                
            });
            
            if (response.status === 200) {
                const decodedToken = jwtDecode(response.data.access);

                // Check user role and redirect accordingly
                const userRole = decodedToken.role;
                
                setauthToken(response.data);
                setuser(decodedToken);

                localStorage.setItem('authTokens', JSON.stringify(response.data));
                if (userRole === 'Doctor') {
                    console.log('User is a doctor');
                    navigate('/doctor_homepage');
                    
                } else if (userRole === 'admin') {
                    console.log('User is an admin');
                    navigate('/Admin_dashboard');

                } else if(userRole === 'user'){
                    console.log('User is a regular user');
                    if(location){
                        window.location.href = location
                        getLocation(null)
                    }else{
                    navigate('/');}
                }
                else{
                    console.log('role else case')
                    navigate('/')
                }

            } else {
               
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Invalid credentials or account blocked.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            // Handle network errors or other exceptions
            Swal.fire({
                title: 'Login Failed',
                text: 'Invalid credentials or account blocked.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    let getLocation = (location)=>{
        setLocation(location)
    }

    let logoutuser = () => {
        setauthToken(null);
        setuser(null);
        localStorage.removeItem('authTokens');
        setItsdoctor('False');
        setIsSuperuser('False');
        navigate('/');
    };

    useEffect(() => {
        console.log(user, 'User is logged in. .................');  // Log a message when user is logged in
    }, [user]);

    let contextData = {
        userlogin: userlogin,
        user: user,
        doctor: doctor,
        logoutuser: logoutuser,
        handledoctorlogin: handledoctorlogin,
        itsdoctor: itsdoctor,
        superuser: superuser,
        setsuperuser: setsuperuser,
        setuser: setuser,
        patient,
        getLocation,
       
    };

    return (
        <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
    );
};