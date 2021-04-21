import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from './App';

describe('AppModule', () => {
  it('matches snapshot', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
      root
    );
    expect(container.cloneNode(true)).toMatchSnapshot();
  });
});
