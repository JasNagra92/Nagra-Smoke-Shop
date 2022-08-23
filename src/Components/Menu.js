import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import brisket from '../Images/brisket.jpg'
import pork from '../Images/Pork-Butt.jpg'
import styles from '../Styles/Menu.module.css'

const Menu = () => {
  return (
    <div className={styles.menuContainer}>
      <div className='row p-5'>
        <Card bg='dark' text='light' style={{ width: '18rem' }}>
          <Card.Img variant="top" src={brisket} />
          <Card.Body>
            <Card.Title>10 lb Smoked Brisket</Card.Title>
            <Card.Text>
              10lb Brisket smoked for 12 hours with Applewood pellets
            </Card.Text>
            <Button variant="primary">Add to Cart</Button>
          </Card.Body>
        </Card>
      </div>
      <div className='row p-5'>
        <Card bg='dark' text='light' style={{ width: '18rem'}}>
          <Card.Img variant="top" src={pork} />
          <Card.Body>
            <Card.Title>10 lb Pulled Pork</Card.Title>
            <Card.Text>
              10lb Boston Butt smoked for 12 hours with Applewood pellets
            </Card.Text>
            <Button variant="primary" onClick={()=>console.log('test')}>Add to Cart</Button>
          </Card.Body>
        </Card>
      </div>

    </div>
  );
};
export default Menu;
