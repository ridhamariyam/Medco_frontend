const initialState = {
    appointments: [],
  };
  
  const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_APPOINTMENTS':
        return { ...state, appointments: action.payload };
      default:
        return state;
    }
  };
  
  export default appointmentReducer;