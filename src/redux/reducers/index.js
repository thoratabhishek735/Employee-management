import { combineReducers } from 'redux';
import employeeReducer from './EmployeeReducers';

const rootReducer = combineReducers({
      employees:employeeReducer
});

export default rootReducer;