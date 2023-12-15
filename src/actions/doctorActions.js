// src/actions/doctorActions.js
export const fetchDoctors = () => async (dispatch) => {
    try {
      // Perform an API request to fetch doctors
      const response = await fetch('/medcoapp/doctors/');
  
      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Convert the response to JSON
      const data = await response.json();
  
      // Dispatch an action with the fetched data
      dispatch({
        type: 'FETCH_DOCTORS',
        payload: data,
      });
    } catch (error) {
      console.error('Error fetching doctors:', error.message);
     
    }
  };
  