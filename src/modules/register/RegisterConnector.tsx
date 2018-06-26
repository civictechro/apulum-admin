import * as React from 'react';
import RegisterView from './view/RegisterView';
import RegisterController from './controller/RegisterController';

// controller -> connector -> view

export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }) => <RegisterView submit={submit} /> }
      </RegisterController>
    );
  }
}
