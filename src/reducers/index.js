import { combineReducers } from 'redux';
import Cookies from 'js-cookie';
const initialState = {
  Clientsdata: [],
  ClientsEditteddata: [],
  Employeedata: [],
  EmployeeEditteddata: [],
  Projectdata: [],
  ProjectEditteddata: [],
  Tasksdata: [],
  TasksEditteddata: [],
  islogin: Cookies.get('login') ? Cookies.get('login') : null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        ...state,
        islogin: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        islogin: action.payload,
      };
    // ! Added Clients in Json
    case 'SET_CLIENTS':
      return {
        ...state,
        Clientsdata: action.payload,
      };
    // ! details of Clients of selected id
    case 'EDIT_CLIENT_DETAILS':
      return {
        ...state,
        ClientsEditteddata: action.payload,
      };
    // ! Added Employees in Json
    case 'SET_EMPLOYEES':
      return {
        ...state,
        Employeedata: action.payload,
      };
    // ! details of Employees of selected id
    case 'EDIT_EMPLOYEE_DETAILS':
      return {
        ...state,
        EmployeeEditteddata: action.payload,
      };
    // ! Added Projects in Json
    case 'SET_PROJECTS':
      return {
        ...state,
        Projectdata: action.payload,
      };
    // ! details of Project of selected id
    case 'EDIT_PROJECT_DETAILS':
      return {
        ...state,
        ProjectEditteddata: action.payload,
      };
    // ! Added tasks in Json
    case 'SET_TASKS':
      return {
        ...state,
        Tasksdata: action.payload,
      };
    // ! details of Project of selected id
    case 'EDIT_TASKS_DETAILS':
      return {
        ...state,
        TasksEditteddata: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({ reducer });
