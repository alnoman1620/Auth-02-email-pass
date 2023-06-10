import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
           <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Firebase Email/Pass Authentication</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to='/login' style={{ textDecoration: "none" }}>Login</NavLink>
            <NavLink to='/register' style={{ textDecoration: "none" }}>Register</NavLink>
            
          </Nav>
        </Container>
      </Navbar>
        </div>
    );
};

export default Navigation;