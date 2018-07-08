import * as React from 'react';
import CallCenterView from './view/CallCenterView';
import CallCenterController, { CallCenterChildrenParams } from './controller/CallCenterController';

// controller -> connector -> view

interface Props {
  history: any;
  location: any;
  match: any;
}

export class CallCenterConnector extends React.PureComponent<Props, {}> {
  render() {
    return (
      <CallCenterController>
       {(data: CallCenterChildrenParams) => (
          <CallCenterView
            data={data.queries}
            mutations={data.mutations}
            {...this.props}
          />
        )}
      </CallCenterController>
    );
  }
}
