import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ButtonToolbar, Button, Table } from 'react-bootstrap';
import CreateShipModal from './CreateShipModal';
import Icon from 'react-crud-icons';
import EditShipModal from './EditShipModal';

const Ships = props => {
  const [ships, setShips] = useState([]);
  const [shipID, setShipId] = useState('');
  const [shipName, setShipName] = useState('');
  const [shipLength, setShipLength] = useState(0);
  const [shipWidth, setShipWidth] = useState(0);
  const [shipCode, setShipCode] = useState('');
  const [createShowModal, setCreateShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);

  const fetchShips = async () => {
    const response = await axios.get('http://localhost:8080/ships');
    setShips(response.data);
  };

  const deleteShip = async shipid => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`http://localhost:8080/ships/${shipid}`);
    }
  };

  useEffect(() => {
    fetchShips(ships);
  }, [ships]);

  let createModalClose = () => setCreateShowModal(false);
  let editModalClose = () => setEditShowModal(false);
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
            <th>Action</th>
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
              <td>
                <Icon
                  name='edit'
                  tooltip='Edit'
                  theme='light'
                  size='medium'
                  onClick={() => {
                    setEditShowModal(true);
                    setShipId(ship.id);
                    setShipName(ship.name);
                    setShipLength(ship.length);
                    setShipWidth(ship.width);
                    setShipCode(ship.code);
                  }}
                />
                <Icon
                  name='delete'
                  tooltip='Delete'
                  theme='light'
                  size='medium'
                  onClick={() => deleteShip(ship.id)}
                />
                <EditShipModal
                  show={editShowModal}
                  onHide={editModalClose}
                  shipid={shipID}
                  name={shipName}
                  length={shipLength}
                  width={shipWidth}
                  code={shipCode}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonToolbar>
        <Button variant='primary' onClick={() => setCreateShowModal(true)}>
          Create Ship
        </Button>
        <CreateShipModal show={createShowModal} onHide={createModalClose} />
      </ButtonToolbar>
    </div>
  );
};

export default Ships;
