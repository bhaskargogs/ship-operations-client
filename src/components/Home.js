import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';

const Home = () => {
  const [search, setSearch] = useState('');
  const [ships, setShips] = useState([]);

  const onInputChange = async value => {
    setSearch(value);
    const response = await axios.get('http://localhost:8080/ships/search', {
      params: {
        searchParam: value,
      },
    });
    setShips(response.data);
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = '')
    );
    setSearch('');
  };

  return (
    <div className='mt-5 justify-content-center'>
      <div className='row'>
        <div className='col-md-2'></div>
        <h2 className='col-md-8'>Welcome to Online Ship Operations Service</h2>
      </div>
      <div className='row mt-5'>
        <div className='col-md-3'></div>
        <Accordion className='col-md-5'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Search Ships</Typography>
          </AccordionSummary>
          <AccordionDetails className='mb-3 row'>
            <TextField
              id='standard-basic'
              label='Search'
              className='form-control col-md-8'
              style={{ width: '240px' }}
              placeholder='Search'
              value={search}
              onChange={e => onInputChange(e.target.value)}
            />
            <ButtonToolbar className='mt-3 col-md-3'>
              <Button variant='dark' onClick={handleReset}>
                Reset
              </Button>
            </ButtonToolbar>
          </AccordionDetails>
        </Accordion>
      </div>
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
          {ships !== null
            ? ships.map(ship => (
                <tr key={ship.id}>
                  <td>{ship.id}</td>
                  <td>{ship.name}</td>
                  <td>{ship.length}</td>
                  <td>{ship.width}</td>
                  <td>{ship.code}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
