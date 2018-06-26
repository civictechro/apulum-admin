import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RegisterConnector } from '../modules/register/RegisterConnector';
import { LoginConnector } from '../modules/login/LoginConnector';
import { ForgotPasswordConnector } from '../modules/forgotPassword/ForgotPasswordConnector';
import { FourOhFour } from '../modules/shared/FourOhFour';

import { adminRoutes } from './adminRoutes';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={ RegisterConnector } />
      <Route exact={true} path="/login" component={ LoginConnector } />
      <Route exact={true} path="/forgotPassword" component={ ForgotPasswordConnector } />
      {adminRoutes.map((route: any) => (
        <Route exact={true} path={route.path} component={ route.component } key={ route.path }/>
      ))}
      <Route component={ FourOhFour } />
    </Switch>
  </BrowserRouter>
);
