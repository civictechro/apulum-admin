import * as React from 'react';
import { Marker } from 'react-map-gl';
import { Icon } from 'antd';

export interface MapboxMarkerProps {
  latitude: number;
  longitude: number;
  onClick: ((event: any) => void) | undefined;
  style: any;
  key: string;
}

export class MapboxMarker extends React.PureComponent<MapboxMarkerProps, {}> {
  render() {
    return(
      <Marker
        key={this.props.key}
        longitude={this.props.longitude}
        latitude={this.props.latitude}>
        <Icon type="environment" onClick={this.props.onClick} style={this.props.style}/>
      </Marker>
    );
  }
}
