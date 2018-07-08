import React from 'react';
import ReactDOM from 'react-dom';
import { MapboxCard } from '../';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapboxCard />, div);
}); 