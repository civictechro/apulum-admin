import React from 'react';
import ReactDOM from 'react-dom';
import { IconLabel } from '../';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IconLabel />, div);
});