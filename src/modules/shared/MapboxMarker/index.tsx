import * as React from 'react';
import { Marker } from 'react-map-gl';
import { Icon } from 'antd';

interface Props {
  latitude: number;
  longitude: number;
  onClick: ((event: any) => void) | undefined;
  style: any;
}

export class MapboxMarker extends React.PureComponent<Props, {}> {
  render() {
    return(
      <Marker
        longitude={this.props.longitude}
        latitude={this.props.latitude}>
        <Icon type="environment" onClick={this.props.onClick} style={this.props.style}/>
      </Marker>
    );
  }
}
