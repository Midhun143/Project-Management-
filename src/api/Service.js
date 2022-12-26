import Instance from './Jsonserver';

export default {
  // ! fetches the client data from json
  fetchClient: () => Instance.get('Client'),
  // ! adds data to json
  createClient: (data) => Instance.post('Client', data),
  // ! fetches data of selected clients from json
  fetchSelectedClient: (id) => Instance.get(`Client/${id}`),
  // ! patches the editted data to json
  EditClient: (id, data) => Instance.patch(`Client/${id}`, data),
  // ! fetches the fetchEmployee data from json
  fetchEmployee: () => Instance.get('Employee'),
  // ! adds data to json
  createEmployee: (data) => Instance.post('Employee', data),
  // ! fetches data of selected clients from json
  fetchSelectedEmployee: (id) => Instance.get(`Employee/${id}`),
  // ! patches the editted data to json
  EditEmployee: (id, data) => Instance.patch(`Employee/${id}`, data),
  // ! fetches the fetch Project data from json
  fetchProject: () => Instance.get('Projects'),
  // ! adds data to json
  createProject: (data) => Instance.post('Projects', data),
  // ! fetches data of selected Projects from json
  fetchSelectedProject: (id) => Instance.get(`Projects/${id}`),
  // ! patches the editted data to json
  EditProject: (id, data) => Instance.patch(`Projects/${id}`, data),
  // ! fetches the fetch Tasks data from json
  fetchTasks: () => Instance.get('Tasks'),
  // ! adds data to json
  createTasks: (data) => Instance.post('Tasks', data),
  // ! fetches data of selected Tasks from json
  fetchSelectedTasks: (id) => Instance.get(`Tasks/${id}`),
  // ! patches the editted data to json
  EditTasks: (id, data) => Instance.patch(`Tasks/${id}`, data),
  getDataFromJson: (url) => Instance.get(url),
  setDataToJson: (url, data) => Instance.post(url, data),
  editDataInJson: (url, data) => Instance.put(url, data),
};
