import * as React from 'react';

interface ILogoutProps {
  history: any;
  location: any;
  match: any;
}

class LogoutLayout extends React.Component<ILogoutProps, {}> {
  static propTypes: ILogoutProps;

  render() {
    return (
      <div>Logout</div>
    );
  }
}

export default LogoutLayout;
