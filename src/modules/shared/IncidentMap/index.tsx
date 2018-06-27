import * as React from 'react';
import { IncidentStatusExpand, IncidentCard } from '../IncidentCard';
import { MapboxCard } from '../MapboxCard';
import { MapboxMarkerProps } from '../MapboxMarker';

interface Props {
  incidents: any[];
  style?: React.CSSProperties;
}

interface State {
  selectedIncident?: any;
}

export class IncidentMap extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIncident: null,
    }
  }

  onMarkerClick = (incident: any) => {
    return (ev: any) => {
      console.log(incident);
      const { selectedIncident } = this.state;

      if (!selectedIncident || selectedIncident.id !== incident.id) {
        this.setState({
          selectedIncident: incident
        });
      } else {
        this.closeIncidentCard();
      }
    }
  }

  closeIncidentCard = (ev?: any) => {
    if (ev) {
      ev.preventDefault();
    }

    this.setState({ selectedIncident: null });
  }

  parseIncident = (incident: any): MapboxMarkerProps => {
    return {
      latitude: incident.latitude,
      longitude: incident.longitude,
      key: incident.id,
      onClick: this.onMarkerClick(incident),
      style: { fontSize: 20, color: IncidentStatusExpand[incident.status].color },
    };
  }

  render() {
    const { incidents, style } = this.props;
    const { selectedIncident } = this.state;

    let incidentCard = null;
    if (selectedIncident) {
      incidentCard =
        <IncidentCard
          incident={selectedIncident}
          onClose={this.closeIncidentCard}
        />;
    }

    const parsedIncidents = incidents.map(this.parseIncident);
    return(
      <div style={style}>
        <MapboxCard markers={parsedIncidents} />
        {incidentCard}
      </div>
    );
}}
