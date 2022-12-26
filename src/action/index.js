import Service from '../api/Service';
import { decrypt, encrypt } from '../Utils/passwordEncryption';
import Cookies from 'js-cookie';
import history from '../components/history';

export const loginData = (loginData) => async (dispatch) => {
  const { data } = await Service.getDataFromJson('loginCredentials/');

  const decrypted = await decrypt(data.password);
  let payload;

  if (
    loginData.userName === data.userName &&
    loginData.password === decrypted
  ) {
    payload = true;
    Cookies.set('login', true);
  } else {
    payload = false;
  }
  dispatch({
    type: 'IS_LOGIN',
    payload,
  });
  if (payload === true) {
    return history.push('/DashBoard'), window.location.reload();
  } else {
    alert('INVALID login credentials');
  }
};

export const logout = () => (dispatch) => {
  Cookies.remove('login');
  dispatch({
    type: 'LOGOUT',
    payload: null,
  });
  history.push('/');
};

export const passwordChange = (details) => async (dispatch) => {
  const { data } = await Service.getDataFromJson('/loginCredentials');
  const decrypted = await decrypt(data.password);
  // console.log(encryptPswd);
  if (decrypted === details.oldPswd) {
    let encryptPswd = encrypt(details.newPswd);
    let userName = data.userName;
    const query = Service.setDataToJson('/loginCredentials', {
      userName,
      password: encryptPswd,
    });
    console.log({ userName, encryptPswd });
  } else {
    alert('Current Password is wrong');
  }
};
// ! Action to fetch added client data
export const fetchclientdata = () => async (dispatch) => {
  const { data } = await Service.fetchClient();
  dispatch({
    type: 'SET_CLIENTS',
    payload: data,
  });
};

// ! Action to add Data to Json
export const CreateClients = (data) => async (dispatch) => {
  await Service.createClient(data);
  dispatch(fetchclientdata());
};

// ! Action to fetch selected client data from id
export const FetchIndividualClientData = (id) => async (dispatch) => {
  const { data } = await Service.fetchSelectedClient(id);
  dispatch({
    type: 'EDIT_CLIENT_DETAILS',
    payload: data,
  });
};

// ! Action to Patch the editted data to Json
export const PatchClientData = (id, data) => async (dispatch) => {
  await Service.EditClient(JSON.parse(id), data);
};

// ! Action to fetch added Employee data
export const fetchemployeedata = () => async (dispatch) => {
  const { data } = await Service.fetchEmployee();
  dispatch({
    type: 'SET_EMPLOYEES',
    payload: data,
  });
};

// ! Action to add Data to Json
export const CreateEmployees = (data) => async (dispatch) => {
  await Service.createEmployee(data);
  dispatch(fetchemployeedata());
};

// ! Action to fetch selected Employee data from id
export const FetchIndividualEmployeeData = (id) => async (dispatch) => {
  const { data } = await Service.fetchSelectedEmployee(id);
  dispatch({
    type: 'EDIT_EMPLOYEE_DETAILS',
    payload: data,
  });
};

// ! Action to Patch the editted data to Json
export const PatchEmployeeData = (id, data) => async (dispatch) => {
  await Service.EditEmployee(JSON.parse(id), data);
};

// ! Action to fetch added Project data
export const fetchProjectdata = () => async (dispatch) => {
  const { data } = await Service.fetchProject();
  dispatch({
    type: 'SET_PROJECTS',
    payload: data,
  });
};

// ! Action to add Data to Json
export const CreateProjects = (data) => async (dispatch) => {
  await Service.createProject(data);
  dispatch(fetchProjectdata());
};

// ! Action to fetch selected Project data from id
export const FetchIndividualProjectData = (id) => async (dispatch) => {
  const { data } = await Service.fetchSelectedProject(id);
  dispatch({
    type: 'EDIT_PROJECT_DETAILS',
    payload: data,
  });
};

// ! Action to Patch the editted data to Json
export const PatchProjectData = (id, data) => async (dispatch) => {
  await Service.EditProject(JSON.parse(id), data);
};

// ! Action to fetch added Tasks data
export const fetchTasksdata = () => async (dispatch) => {
  const { data } = await Service.fetchTasks();
  dispatch({
    type: 'SET_TASKS',
    payload: data,
  });
};

// ! Action to add Data to Json
export const CreateTasks = (data) => async (dispatch) => {
  await Service.createTasks(data);
  dispatch(fetchTasksdata());
};

// ! Action to fetch selected Tasks data from id
export const FetchIndividualTasksData = (id) => async (dispatch) => {
  const { data } = await Service.fetchSelectedTasks(id);
  dispatch({
    type: 'EDIT_TASKS_DETAILS',
    payload: data,
  });
};

// ! Action to Patch the editted data to Json
export const PatchTasksData = (id, data) => async (dispatch) => {
  await Service.EditTasks(JSON.parse(id), data);
};
