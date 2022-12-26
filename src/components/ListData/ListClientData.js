import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchclientdata } from '../../action';

const ListClientData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchclientdata());
  }, []);
  const { Clientsdata } = useSelector((state) => state.reducer);
  const columns = [
    {
      name: 'Sl.No',
      selector: (row) => row.id,
    },
    {
      name: 'firstName',
      selector: (row) => row.firstName,
    },
    {
      name: 'lastName',
      selector: (row) => row.lastName,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'country',
      selector: (row) => row.country,
    },
    {
      name: 'Edit',
      selector: (row) => (
        <Link to={`/EditClients/${row.id}`}>
          <button className="btn btn-warning">Edit</button>
        </Link>
      ),
    },

    // {
    //   name: 'Photo',
    //   selector: (row) => <img src={row.Photo}></img>,
    // },
  ];
  const mapclients = Clientsdata.map((data, index) => ({
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    country: data.country,
    // Photo: data.Photo,
  }));

  return (
    <div>
      <DataTable columns={columns} data={mapclients} />
    </div>
  );
};

export default ListClientData;
