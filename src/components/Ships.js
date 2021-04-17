import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ButtonToolbar, Button, Table } from 'react-bootstrap';
import CreateShipModal from './CreateShipModal';

const Ships = props => {
  const [ships, setShips] = useState([]);
  const [addShowModal, setAddShowModal] = useState(false);
  const fetchShips = async () => {
    const response = await axios.get('http://localhost:8080/ships');

    setShips(response.data);
  };

  useEffect(() => { fetchShips(ships) }, [ ships ]);

  let onModalClose = () => setAddShowModal(false);

  return (
    <div>
      <Table className='mt-4' striped bordered hover size='small'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Length (metres)</th>
            <th>Width (metres)</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {ships.map(ship => (
            <tr key={ship.id}>
              <td>{ship.id}</td>
              <td>{ship.name}</td>
              <td>{ship.length}</td>
              <td>{ship.width}</td>
              <td>{ship.code}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonToolbar>
        <Button variant='primary' onClick={() => setAddShowModal(true)}>
          Create Ship
        </Button>
        <CreateShipModal show={addShowModal} onHide={onModalClose} />
      </ButtonToolbar>
    </div>
  );
};

export default Ships;
