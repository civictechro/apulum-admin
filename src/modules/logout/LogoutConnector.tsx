import * as React from 'react';
import LogoutView from './view/LogoutView';
import LogoutController from './controller/LogoutController';

// controller -> connector -> view

export class LogoutConnector extends React.PureComponent {
  render() {
    return (
      <LogoutController>
        {({ submit }) => <LogoutView submit={submit} /> }
      </LogoutController>
    );
  }
}
