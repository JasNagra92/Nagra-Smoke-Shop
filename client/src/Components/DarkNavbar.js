import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { BsFillCartFill } from 'react-icons/bs';
import { CartContext } from './CartContext';
import styles from '../Styles/Nav.module.css';

const DarkNavbar = () => {
  const [cart, setCart] = useContext(CartContext);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Nagra Smoke Shop</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link>
              <Link to="/" className={styles.link}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/menu" className={styles.link}>
                Menu
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/contact" className={styles.link}>
                Contact Me
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/cart" className={styles.link}>
                <BsFillCartFill size={30} />
                <div className={styles.cart}>{cart.length}</div>
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
export default DarkNavbar;
