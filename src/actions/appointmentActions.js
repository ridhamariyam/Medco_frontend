
export const fetchAppointments = () => async (dispatch) => {
    try {
      // Perform an API request to fetch appointments
      const response = await fetch('/medcoapp/appointments/');
  
      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Convert the response to JSON
      const data = await response.json();
  
      // Dispatch an action with the fetched data
      dispatch({
        type: 'FETCH_APPOINTMENTS',
        payload: data,
      });
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error('Error fetching appointments:', error.message);
      // Optionally dispatch an error action or show an error to the user
    }
  };
  