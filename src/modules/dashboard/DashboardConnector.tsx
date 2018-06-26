import * as React from 'react';
import DashboardView from './view/DashboardView';
import DashboardController from './controller/DashboardController';

// controller -> connector -> view

interface Props {
  history: any;
  location: any;
  match: any;
}

export class DashboardConnector extends React.PureComponent<Props, {}> {
  render() {
    return (
      <DashboardController>
        {(data) => <DashboardView data={data} {...this.props}/> }
      </DashboardController>
    );
  }
}
