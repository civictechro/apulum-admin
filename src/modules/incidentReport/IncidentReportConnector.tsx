import * as React from 'react';

import IncidentReportView from './view/IncidentReportView';
import IncidentReportController, {
  IncidentReportChildrenParams
} from './controller/IncidentReportController';

// controller -> connector -> view

interface Props {
  history: any;
  location: any;
  match: any;
}

export class IncidentReportConnector extends React.PureComponent<Props, {}> {
  render() {
    return (
      <IncidentReportController>
       {(data: IncidentReportChildrenParams) => (
          <IncidentReportView
            data={data.queries}
            {...this.props}
          />
        )}
      </IncidentReportController>
    );
  }
}
