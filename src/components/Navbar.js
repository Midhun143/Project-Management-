import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login';
import { logout } from '../action';

const LINKS = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  margin-right: 17px;
  color: whitesmoke;
  &:hover {
    color: red;
  }
`;

const Header = () => {
  const [show, setShow] = useState(false);

  const { islogin } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ fontSize: '1.5rem' }} href="/DashBoard">
            Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {!islogin ? (
              <button className="btn btn-outline-success" onClick={handleShow}>
                LOGIN
              </button>
            ) : (
              <>
                <Nav className="me-auto">
                  <LINKS to="/AddClients">Add&nbsp;Clients</LINKS>
                  <LINKS to="/ListClients">List&nbsp;Clients</LINKS>
                  <LINKS to="/AddEmployees">Add&nbsp;Employees</LINKS>
                  <LINKS to="/ListEmployees">List&nbsp;Employees</LINKS>
                  <LINKS to="/AddProjects">Add&nbsp;Projects</LINKS>
                  <LINKS to="/ListProjects">List&nbsp;Projects</LINKS>
                  <LINKS to="/Addtasks">Add&nbsp;tasks</LINKS>
                  <LINKS to="/ListTasks">List&nbsp;Tasks</LINKS>
                  <LINKS to="/change-pswd">Change&nbsp;Password</LINKS>
                </Nav>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => dispatch(logout())}
                >
                  LOGOUT
                </button>
              </>
            )}
            <Login handleClose={handleClose} show={show} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
