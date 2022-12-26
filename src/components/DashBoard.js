import React, { useEffect } from 'react';
import Cards from './Cards';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchclientdata,
  fetchemployeedata,
  fetchProjectdata,
  fetchTasksdata,
} from '../action';
const DashBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchclientdata());
    dispatch(fetchProjectdata());
    dispatch(fetchTasksdata());
    dispatch(fetchemployeedata());
  }, []);
  const { Clientsdata, Employeedata, Projectdata, Tasksdata } = useSelector(
    (state) => state.reducer
  );

  const Clients = Clientsdata.length;
  const Employees = Employeedata.length;
  const Projects = Projectdata.length;
  const tasks = Tasksdata.length;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        background:
          'Url(https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/company-culture.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <div style={{ margin: '5% 3% 0% 1%' }}>
        <Cards Clients={Clients} bg={'warning'} Name={'Clients'} />
      </div>
      <div style={{ margin: '5% 5% 0% 0%' }}>
        <Cards Clients={Employees} bg={'danger'} Name={'Employees'} />
      </div>
      <div style={{ margin: '5% 5% 0% 0%' }}>
        <Cards Clients={Projects} bg={'dark'} Name={'Projects'} />
      </div>
      <div style={{ margin: '5% 0% 0% 0%' }}>
        <Cards Clients={tasks} bg={'success'} Name={'tasks'} />
      </div>
    </div>
  );
};

export default DashBoard;
