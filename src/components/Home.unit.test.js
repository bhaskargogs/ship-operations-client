import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Home from './Home';

describe('Home Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<Home />);
    expect(container.cloneNode(true)).toMatchSnapshot();
  });

  it('initial Ships', () => {
    render(<Home />);

    const searchField = screen.getByLabelText('Search');
    expect(searchField).toHaveValue('');

    const table = screen.getByRole('table');
    expect(table).toBeTruthy();

    expect(
      screen.getByRole('table').getElementsByTagName('tbody')
    ).toHaveLength(1);
  });
});
