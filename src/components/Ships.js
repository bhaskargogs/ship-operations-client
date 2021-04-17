import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const Ships = props => {
  const [ships, setShips] = useState([]);
  useEffect(() => {
    async function fetchShips() {
      let result = await axios.get('http://localhost:8080/ships');
      setShips(result.data);
    }
    fetchShips();
  }, []);
  return (
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
  );
};

export default Ships;
