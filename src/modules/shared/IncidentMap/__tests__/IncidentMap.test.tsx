import React from 'react';
import ReactDOM from 'react-dom';
import { IncidentMap } from '../';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IncidentMap incidents={[]} />, div);
});