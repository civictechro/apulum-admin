import React from 'react';
import ReactDOM from 'react-dom';
import { UserMenu } from '../';

// tslint:disable jsx-no-lambda
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <UserMenu 
      items={[{
        icon: 'user',
        label: 'test'
      }]}
      onClick={_ => { return; }} 
    />, 
    div
  );
}); 