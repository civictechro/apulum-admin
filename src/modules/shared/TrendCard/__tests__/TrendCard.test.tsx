import React from 'react';
import ReactDOM from 'react-dom';
import { TrendCard } from '../';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TrendCard 
      title="Test"
      description="Test"
      value={42}
    />, 
    div
  );
}); 