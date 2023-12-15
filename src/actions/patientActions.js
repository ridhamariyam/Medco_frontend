
export const fetchPatients = () => async (dispatch) => {
    try {
      // Perform an API request to fetch patients
      const response = await fetch('/medcoapp/patients/');
      
      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Convert the response to JSON
      const data = await response.json();
  
      // Dispatch an action with the fetched data
      dispatch({
        type: 'FETCH_PATIENTS',
        payload: data,
      });
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error('Error fetching patients:', error.message);
      // Optionally dispatch an error action or show an error to the user
    }
  };
  