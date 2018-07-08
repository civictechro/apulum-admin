import React from 'react';
import ReactDOM from 'react-dom';
import { LoggedOutContainer } from '../';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoggedOutContainer />, div);
});