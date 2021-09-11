import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, GET_EMPLOYEES, DELETE_EMPLOYEE } from "../constants/constants";

export const getEmployees = () => {

    return (dispatch) => {
        dispatch({ type: GET_EMPLOYEES, data: null });
    }
};

export const deleteEmployee = (data) => {
    return (dispatch) => {
        return dispatch({ type: DELETE_EMPLOYEE, data: data });
    }
};

export const updateEmployee = (data) => {
    return (dispatch) => {
        return dispatch({ type: UPDATE_EMPLOYEE, data: data });
    }
}

export const addEmployee = (data) => {
    return (dispatch) => {
        return dispatch({ type: ADD_EMPLOYEE, data: data });
    }
}