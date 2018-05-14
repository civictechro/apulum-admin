import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { routes } from './common/routes';

import AdminLayout from './containers/AdminLayout';

import './App.css';
class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          {
            routes.map(el => {
              return (
                // tslint:disable-next-line jsx-no-lambda
                <Route exact={false} path={el.path} key={el.path} render={(routeProps) => {
                  return (
                    <AdminLayout {...routeProps} />
                  );
                }} />
              );
            })
          }
        </div>
      </Router>
    );
  }
}

export default App;
