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
  const [shipsPerPage] = useState(20);
  const [direction, setDirection] = useState('');
  const [sortField, setSortField] = useState('');
  const [shipID, setShipId] = useState('');
  const [shipName, setShipName] = useState('');
  const [shipLength, setShipLength] = useState(0);
  const [shipWidth, setShipWidth] = useState(0);
  const [shipCode, setShipCode] = useState('');
  const [createShowModal, setCreateShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);

  const headers = [
    { name: 'ID', field: 'id', sortable: true },
    { name: 'Name', field: 'name', sortable: true },
    { name: 'Length (metres)', field: 'length', sortable: true },
    { name: 'Width (metres)', field: 'width', sortable: true },
    { name: 'Code', field: 'code', sortable: true },
    { name: 'Action', field: 'action', sortable: false },
  ];

  const deleteShip = async shipid => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`http://localhost:8080/ships/${shipid}`);
    }
  };

  useEffect(() => {
    async function fetchShips(event) {
      const response = await axios.get('http://localhost:8080/ships', {
        params: {
          pageNo: currentPage - 1,
          pageSize: shipsPerPage,
          sort: sortField || 'id',
          direction: direction || 'asc',
        },
      });
      setShips(response.data.ships);
      setTotalShips(response.data.totalShips);
    }

    fetchShips();
  });

  const shipData = useMemo(() => {
    let computedShips = ships;

    if (sortField) {
      computedShips = computedShips.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return computedShips;
  }, [ships, sortField, direction]);

  let createModalClose = () => setCreateShowModal(false);
  let editModalClose = () => setEditShowModal(false);
  return (
    <div>
      <div className='row mt-5'>
        <div className='col-md-5'>
          <PaginationComponent
            total={totalShips}
            itemsPerPage={shipsPerPage}
            currentPage={currentPage}
            onPageChange={page => {
              setCurrentPage(page);
            }}
          />
        </div>
        <div className='col-md-5'></div>
        <div className='col-md-2'>
          <ButtonToolbar>
            <Button variant='primary' onClick={() => setCreateShowModal(true)}>
              Create Ship
            </Button>
            <CreateShipModal show={createShowModal} onHide={createModalClose} />
          </ButtonToolbar>
        </div>
        <div className='col-md-6'></div>
      </div>
      <Table className='mt-4' striped bordered hover size='small'>
        <Header
          headers={headers}
          onSorting={(field, order) => {
            setTimeout(() => {
              setDirection(order);
              setSortField(field);
            }, 1000);
          }}
        />
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
    </div>
  );
};

export default Ships;
