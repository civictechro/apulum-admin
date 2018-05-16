import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AdminLayout from './containers/AdminLayout';

import './App.css';
import LoginLayout from './containers/LoginLayout';
import LogoutLayout from './containers/LogoutLayout.tsx';
import RegisterLayout from './containers/RegisterLayout.tsx';

// tslint:disable jsx-no-lambda
class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route exact={false} path="/admin" render={(routeProps) => {
            return (
              <AdminLayout {...routeProps} />
            );
          }} />

          <Route exact={true} path="/login" render={(routeProps) => {
            return (
              <LoginLayout {...routeProps} />
            );
          }} />

          <Route exact={true} path="/logout" render={(routeProps) => {
            return (
              <LogoutLayout {...routeProps} />
            );
          }} />

          <Route exact={true} path="/register" render={(routeProps) => {
            return (
              <RegisterLayout {...routeProps} />
            );
          }} />

        </Switch>
      </Router>
    );
  }
}

export default App;
