import fontawesome from '@fortawesome/fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

fontawesome.library.add(faArrowUp, faArrowDown);

const Header = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc');

  const onSortingChange = field => {
    const order =
      field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc';

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };
  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {name}

            {sortingField && sortingField === field && (
              <FontAwesomeIcon
                icon={sortingOrder === 'asc' ? 'arrow-down' : 'arrow-up'}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
