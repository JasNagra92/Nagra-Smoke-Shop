import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const DarkNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Nagra Smoke Shop</Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/menu">Menu</Nav.Link>
              <Nav.Link href="/contact">Contact Me</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
    </div>
  );
};
export default DarkNavbar;
