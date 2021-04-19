/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { ButtonToolbar, Button, Table } from 'react-bootstrap';
import CreateShipModal from './CreateShipModal';
import Icon from 'react-crud-icons';
import EditShipModal from './EditShipModal';
import Header from './Table/Header';
import PaginationComponent from './Table/Pagination';

const Ships = props => {
  const [ships, setShips] = useState([]);
  const [totalShips, setTotalShips] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [shipsPerPage, setShipsPerPage] = useState(20);
  const [direction, setDirection] = useState('asc');
  const [sortField, setSortField] = useState('id');
  const [shipID, setShipId] = useState('');
  const [shipName, setShipName] = useState('');
  const [shipLength, setShipLength] = useState(0);
  const [shipWidth, setShipWidth] = useState(0);
  const [shipCode, setShipCode] = useState('');
  const [createShowModal, setCreateShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);

  const headers = [
    { name: 'ID', field: 'id' },
    { name: 'Name', field: 'name' },
    { name: 'Length (metres)', field: 'length' },
    { name: 'Width (metres)', field: 'width' },
    { name: 'Code', field: 'code' },
  ];

  const fetchShips = async () => {
    const response = await axios.get('http://localhost:8080/ships', {
      params: {
        pageNo: currentPage - 1,
        pageSize: shipsPerPage,
        sort: sortField,
        direction: direction,
      },
    });
    setShips(response.data.ships);
    setTotalShips(response.data.totalShips);
  };

  const deleteShip = async shipid => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`http://localhost:8080/ships/${shipid}`);
    }
  };

  useEffect(() => {
    fetchShips(ships);
  }, [ships]);

  const shipData = useMemo(() => {
    let computedShips = ships;

    // return computedShips.slice(
    //   (currentPage - 1) * shipsPerPage,
    //   (currentPage - 1) * shipsPerPage + shipsPerPage
    // );
    return computedShips;
  }, [ships]);

  let createModalClose = () => setCreateShowModal(false);
  let editModalClose = () => setEditShowModal(false);
  return (
    <div>
      <div className='row mt-4'>
        <div className='col-md-6'>
          <PaginationComponent
            total={totalShips}
            itemsPerPage={shipsPerPage}
            currentPage={currentPage}
            onPageChange={page => {
              setCurrentPage(page);
              fetchShips();
            }}
          />
        </div>
        <div className='col-md-6'></div>
      </div>
      <Table className='mt-4' striped bordered hover size='small'>
        <Header headers={headers} />
        <tbody>
          {shipData.map(ship => (
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
