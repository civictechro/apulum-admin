import React from 'react';
import ReactDOM from 'react-dom';
import { IncidentCard } from '../';
import { IncidentReportType, IncidentReportStatus } from '../../../../types/graphql-types';

// tslint:disable jsx-no-lambda
it('renders without crashing', () => {
  const div = document.createElement('div');
  const mockIncident = {
    latitude: 1,
    longitude: 1,
    title: "",
    description: "",
    type: IncidentReportType.OTHER,
    status: IncidentReportStatus.NEW,
  };

  ReactDOM.render(
    <IncidentCard
      incident={mockIncident}
      onClose={_ => { return; }}
    />,
    div
  );
});
