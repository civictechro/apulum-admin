import React from 'react';
import ReactDOM from 'react-dom';
import { TrendLabel, TrendDirection } from '../';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TrendLabel 
      title="Test"
      direction={ TrendDirection.Up }
      value={42}
    />, 
    div
  );
}); 