import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from './App';
import Home from './components/Home';
import Ships from './components/Ships';

describe('ShipModule', () => {
  test('initial state', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    const { container } = render(<App />, root);
    expect(container.cloneNode(true)).toMatchSnapshot();
  });
  test('Home Component', () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(
      screen.getByText('Welcome to Online Ship Operations Service')
    ).toBeInTheDocument();

    expect(screen.getByText('Search Ships')).toBeInTheDocument();

    const button = screen.getByText('Search Ships');
    fireEvent.click(button);

    const searchField = screen.getByLabelText('Search');
    expect(searchField).toHaveValue('');
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  test('Ship Component', () => {
    render(<Ships />, { wrapper: MemoryRouter });
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
