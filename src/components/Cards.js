import React from 'react';
import Card from 'react-bootstrap/Card';

const Cards = ({ Clients, bg, Name }) => {
  return (
    <div>
      <Card bg={bg} text="white" style={{ width: '18rem' }} className="mb-2">
        <Card.Header>{Name}</Card.Header>
        <Card.Body>
          <Card.Title>{Clients}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cards;
