import { render } from '@testing-library/react';
import React from 'react';
import Ships from './Ships';

describe('Ships Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<Ships />);
    expect(container.cloneNode(true)).toMatchSnapshot();
  });
});
