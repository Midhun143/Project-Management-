import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddClients from './AddData/AddClients';
import AddEmployees from './AddData/AddEmployees';
import AddProjects from './AddData/AddProjects';
import AddTasks from './AddData/AddTasks';
import ListClientData from './ListData/ListClientData';
import ListEmployeeData from './ListData/ListEmployeeData';
import ListProjectData from './ListData/ListProjectData';
import ListTaskData from './ListData/ListTaskData';
import PrivateRouting from './PrivateRouting';
import { useSelector } from 'react-redux';
import ChangePswd from './ChangePswd';
import Header from './Navbar';
import Home from './Home';
import DashBoard from './DashBoard';
const App = () => {
  const { islogin } = useSelector((state) => state.reducer);

  return (
    <div>
      <Router>
        {/* Common Header section */}
        <Header />
        {/* Home Route */}
        <Route exact path="/">
          <Home />
        </Route>
        {/* Route to Dashboard */}
        <PrivateRouting path="/DashBoard" isAuthenticated={islogin}>
          <DashBoard />
        </PrivateRouting>
        {/* Route to add clients */}
        <PrivateRouting path="/AddClients" isAuthenticated={islogin}>
          <AddClients />
        </PrivateRouting>

        {/* Route to edit clients */}
        <PrivateRouting path="/EditClients/:id" isAuthenticated={islogin}>
          <AddClients />
        </PrivateRouting>

        {/* Route to List All Clients */}
        <PrivateRouting path="/ListClients" isAuthenticated={islogin}>
          <ListClientData />
        </PrivateRouting>

        {/* Route to Add Employees */}
        <PrivateRouting path="/AddEmployees" isAuthenticated={islogin}>
          <AddEmployees />
        </PrivateRouting>

        {/* Route to Edit Employee Details */}
        <PrivateRouting path="/EditEmployees/:id" isAuthenticated={islogin}>
          <AddEmployees />
        </PrivateRouting>
        {/* Route to List  All Employees */}
        <PrivateRouting path="/ListEmployees" isAuthenticated={islogin}>
          <ListEmployeeData />
        </PrivateRouting>
        {/* Route to add Projects */}
        <PrivateRouting path="/AddProjects" isAuthenticated={islogin}>
          <AddProjects />
        </PrivateRouting>
        {/* Route to List  All Projects */}
        <PrivateRouting path="/ListProjects" isAuthenticated={islogin}>
          <ListProjectData />
        </PrivateRouting>
        {/* Route to Edit Project Details */}
        <PrivateRouting path="/EditProjects/:id" isAuthenticated={islogin}>
          <AddProjects />
        </PrivateRouting>
        {/* Route to add Tasks */}
        <PrivateRouting path="/Addtasks" isAuthenticated={islogin}>
          <AddTasks />
        </PrivateRouting>
        {/* Route to List  All Tasks */}
        <PrivateRouting path="/ListTasks" isAuthenticated={islogin}>
          <ListTaskData />
        </PrivateRouting>
        {/* Route to Edit Tasks Details */}
        <PrivateRouting path="/EditTasks/:id" isAuthenticated={islogin}>
          <AddTasks />
        </PrivateRouting>
        {/* Change Password */}
        <PrivateRouting path="/change-pswd" isAuthenticated={islogin}>
          <ChangePswd />
        </PrivateRouting>
      </Router>
    </div>
  );
};

export default App;
