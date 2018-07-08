import * as React from 'react';
import IncidentComposer from '../IncidentComposer';
import { MapboxCard } from '../MapboxCard';
import { IncidentReportInput } from '../../../types/graphql-types';

export interface IncidentPosition {
  latitude: number;
  longitude: number;
}

interface State {
  isEditingIncident: boolean;
  currentIncidentPosition: IncidentPosition | null;
}

interface Props {
  userId: string;
  onSave: (data: IncidentReportInput) => void;
  style?: React.CSSProperties;
}

export default class IncidentMapComposer extends React.PureComponent<Props, State> {
  state = {
    currentIncidentPosition: null,
    isEditingIncident: false,
  }

  closeCurrentIncident = () => {
    this.setState({ isEditingIncident: false });
  }

  addIncidentReport = (ev: any) => {
    if (!this.state.isEditingIncident) {
      this.setState({ isEditingIncident: true });
    }
    this.setState({
      currentIncidentPosition: {
        latitude: ev.lngLat[1],
        longitude: ev.lngLat[0],
      }
    });
  }

  render() {
    const {
      currentIncidentPosition,
      isEditingIncident
    } = this.state;

    const {
      style,
      onSave,
      userId
    } = this.props;

    let incidentInProgress = null;
    let marker = null;

    if (isEditingIncident && currentIncidentPosition) {
      incidentInProgress = (
        <IncidentComposer
          onClose={this.closeCurrentIncident}
          onSave={onSave as any}
          userId={userId}
          position={currentIncidentPosition}
        />
      );

      marker = {
        latitude: (currentIncidentPosition as IncidentPosition).latitude,
        longitude: (currentIncidentPosition as IncidentPosition).longitude,
        key: 'marker',
        onClick: () => { return; },
        style: { fontSize: 20, color: '#f00' },
      };
    }

    return (
      <div style={style}>
        <MapboxCard onClick={this.addIncidentReport} markers={marker ? [marker] : undefined} />
        {incidentInProgress}
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}
