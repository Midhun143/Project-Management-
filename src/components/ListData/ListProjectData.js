import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchemployeedata, fetchProjectdata } from '../../action';

const ListProjectData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjectdata());
  }, []);
  const { Projectdata } = useSelector((state) => state.reducer);
  const columns = [
    {
      name: 'Sl.No',
      selector: (row) => row.id,
    },
    {
      name: 'ProjectName',
      selector: (row) => row.ProjectName,
    },

    {
      name: 'Client',
      selector: (row) => row.Client,
    },
    {
      name: 'Mode',
      selector: (row) => row.Mode,
    },
    {
      name: 'Type',
      selector: (row) => row.Type,
    },
    {
      name: 'Technology',
      selector: (row) => row.Technology,
    },
    {
      name: 'Estimate',
      selector: (row) => row.Estimate,
    },
    {
      name: 'Resources',
      selector: (row) => row.Resources,
    },

    {
      name: 'Edit',
      selector: (row) => (
        <Link to={`/EditProjects/${row.id}`}>
          <button className="btn btn-warning">Edit</button>
        </Link>
      ),
    },

    // {
    //   name: 'Photo',
    //   selector: (row) => <img src={row.Photo}></img>,
    // },
  ];
  const mapprojects = Projectdata.map((data, index) => ({
    id: data.id,
    ProjectName: data.ProjectName,
    Client: data.Client,
    Mode: data.Mode,
    Type: data.Type,
    Technology: data.Technology,
    Estimate: data.Estimate,
    Resources: data.Resources,
  }));

  return (
    <div>
      <DataTable columns={columns} data={mapprojects} />
    </div>
  );
};

export default ListProjectData;
