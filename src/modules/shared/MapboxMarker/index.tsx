import * as React from 'react';
import { Marker } from 'react-map-gl';
import * as FontAwesome from 'react-fontawesome';

export interface MapboxMarkerProps {
  latitude: number;
  longitude: number;
  onClick?: ((event: any) => void) | undefined;
  style: any;
  key: string;
}

export class MapboxMarker extends React.PureComponent<MapboxMarkerProps, {}> {
  render() {
    const onClick = this.props.onClick
      ? this.props.onClick
      : () => { return; }

    return(
      <Marker
        longitude={this.props.longitude}
        latitude={this.props.latitude}>
        <FontAwesome name='fas fa-circle' onClick={onClick} style={this.props.style} />
      </Marker>
    );
  }
}
