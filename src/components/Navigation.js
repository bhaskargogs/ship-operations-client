import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigation = props => {
  return (
    <Navbar bg='primary' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav>
          <NavLink
            className='d-inline p-2 bg-primary text-white text-decoration-none'
            to='/'
          >
            Home
          </NavLink>
        </Nav>
        <Nav>
          <NavLink
            className='d-inline p-2 bg-primary text-white text-decoration-none'
            to='/ships'
          >
            Ships
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
