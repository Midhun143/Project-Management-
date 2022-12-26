import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchemployeedata } from '../../action';

const ListEmployeeData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchemployeedata());
  }, []);
  const { Employeedata } = useSelector((state) => state.reducer);
  const columns = [
    {
      name: 'Sl.No',
      selector: (row) => row.id,
    },
    {
      name: 'EMPID',
      selector: (row) => row.EMPID,
    },
    {
      name: 'Name',
      selector: (row) => row.Name,
    },

    {
      name: 'Department',
      selector: (row) => row.Department,
    },
    {
      name: 'experience',
      selector: (row) => row.experience,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },

    {
      name: 'Edit',
      selector: (row) => (
        <Link to={`/EditEmployees/${row.id}`}>
          <button className="btn btn-warning">Edit</button>
        </Link>
      ),
    },

    // {
    //   name: 'Photo',
    //   selector: (row) => <img src={row.Photo}></img>,
    // },
  ];
  const mapemployees = Employeedata.map((data, index) => ({
    id: data.id,
    Name: data.Name,
    EMPID: data.EMPID,
    Department: data.Department,
    experience: data.experience,
    email: data.email,
    country: data.country,
    // Photo: data.Photo,
  }));

  return (
    <div>
      <DataTable columns={columns} data={mapemployees} />
    </div>
  );
};

export default ListEmployeeData;
