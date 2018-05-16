import * as React from 'react';

interface IRegisterProps {
  history: any;
  location: any;
  match: any;
}

class RegisterLayout extends React.Component<IRegisterProps, {}> {
  static propTypes: IRegisterProps;

  render() {
    return (
      <div>Register</div>
    );
  }
}

export default RegisterLayout;
