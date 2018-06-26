import * as React from 'react';
import ForgotPasswordView from './view/ForgotPasswordView';
import ForgotPasswordController from './controller/ForgotPasswordController';

// controller -> connector -> view

export class ForgotPasswordConnector extends React.PureComponent {
  render() {
    return (
      <ForgotPasswordController>
        {({ submit }) => <ForgotPasswordView submit={submit} /> }
      </ForgotPasswordController>
    );
  }
}
