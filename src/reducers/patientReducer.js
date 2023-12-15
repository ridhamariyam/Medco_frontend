const initialState = {
    patients: [],
  };
  
  const patientReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PATIENTS':
        return { ...state, patients: action.payload };
      // Add other cases as needed for different actions
      default:
        return state;
    }
  };
  
  export default patientReducer;