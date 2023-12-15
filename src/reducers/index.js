import { combineReducers } from 'redux';
import doctorReducer from './doctorReducer';
import appointmentReducer from './appointmentReducer';
import patientReducer from './patientReducer'

const rootReducer = combineReducers({
  doctors: doctorReducer,
  appointments: appointmentReducer,
  patient:patientReducer,
});

export default rootReducer;