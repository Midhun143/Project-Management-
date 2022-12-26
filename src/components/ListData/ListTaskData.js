import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasksdata } from '../../action';

const ListTaskData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasksdata());
  }, []);
  const { Tasksdata } = useSelector((state) => state.reducer);
  const columns = [
    {
      name: 'Sl.No',
      selector: (row) => row.id,
    },
    {
      name: 'Project',
      selector: (row) => row.Project,
    },

    {
      name: 'Milestone',
      selector: (row) => row.Milestone,
    },
    {
      name: 'Sprint',
      selector: (row) => row.Sprint,
    },
    {
      name: 'Tasks',
      selector: (row) => row.Tasks,
    },
    {
      name: 'TaskDescription',
      selector: (row) => row.TaskDescription,
    },
    {
      name: 'Allocation',
      selector: (row) => row.Allocation,
    },

    {
      name: 'Edit',
      selector: (row) => (
        <Link to={`/EditTasks/${row.id}`}>
          <button className="btn btn-warning">Edit</button>
        </Link>
      ),
    },

    // {
    //   name: 'Photo',
    //   selector: (row) => <img src={row.Photo}></img>,
    // },
  ];
  const maptasks = Tasksdata.map((data, index) => ({
    id: data.id,
    Project: data.Project,
    Milestone: data.Milestone,
    Sprint: data.Sprint,
    Tasks: data.Tasks,
    TaskDescription: data.TaskDescription,
    Allocation: data.Allocation,
  }));

  return (
    <div>
      <DataTable columns={columns} data={maptasks} />
    </div>
  );
};

export default ListTaskData;
