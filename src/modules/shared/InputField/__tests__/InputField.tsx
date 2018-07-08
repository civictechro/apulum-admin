import React from 'react';
import ReactDOM from 'react-dom';
import { InputField } from '../';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputField field={{ name: 'test' }} form={{touched: [], errors: []}} />, div);
});