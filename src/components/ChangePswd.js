import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { passwordChange } from '../action/index';

const ChangePswd = () => {
  const [oldPswd, setOldPswd] = useState('');
  const [newPswd, setNewPswd] = useState('');
  const dispatch = useDispatch();

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordChange({ oldPswd, newPswd }));
  };

  return (
    <div className="m-5  ">
      <>
        <h1>ChangePassword</h1>
        <form onSubmit={formSubmit} className="w-50">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Current Password"
              className="form-control"
              value={oldPswd}
              onChange={(e) => setOldPswd(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="New Password"
              className="form-control"
              value={newPswd}
              onChange={(e) => setNewPswd(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Change
          </button>
        </form>
      </>
    </div>
  );
};

export default ChangePswd;
