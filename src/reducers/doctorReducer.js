const initialState = {
    doctors: [],
  };
  
  const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DOCTORS':
        return { ...state, doctors: action.payload };
      // Add other cases as needed for different actions
      default:
        return state;
    }
  };
  
  export default doctorReducer;