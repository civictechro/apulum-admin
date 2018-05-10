import * as React from 'react';

import {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { incidents } from './incidents';
import { Icon } from 'antd';

interface IMapBoxViewport {
  width: number;
  height: number;
  latitude: number;
  longitude: number;
  zoom: number;
}

interface IMapBoxSettings {
  dragPan: boolean;
  dragRotate: boolean;
  scrollZoom: boolean;
  touchZoom: boolean;
  touchRotate: boolean;
  keyboard: boolean;
  doubleClickZoom: boolean;
  minZoom: number;
  maxZoom: number;
  minPitch: number;
  maxPitch: number;
}
interface IIncidentMapProps {
  viewport: IMapBoxViewport;
  settings: IMapBoxSettings;
}

interface IIncidentMapState {
  viewport: IMapBoxViewport;
  settings: IMapBoxSettings;
}

class IncidentMap extends Component<IIncidentMapProps, IIncidentMapState> {
  static propTypes: IIncidentMapProps;

  constructor(props: IIncidentMapProps) {
    super(props);
    if (props.viewport) {
      this.state = props;
    }
  }

  onViewportChange = (v: IMapBoxViewport) => {
    this.setState({viewport: v})
  }

  _renderMarker(incident: any, i: number) {
    const {name, coordinates} = incident;

    return (
      <Marker key={i} longitude={coordinates[1]} latitude={coordinates[0]} >
        <div>
          <Icon
            type="environment"
            style={{ fontSize: "20px", color: "#933" }}
            title={name}
          />
        </div>
      </Marker>
    );
  }

  render() {
    const {viewport, settings} = this.state;

    return (
      <ReactMapGL
        {...viewport}
        {...settings}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
        onViewportChange={this.onViewportChange}>
        { incidents.map(this._renderMarker) }
      </ReactMapGL>
    );
  }
}

export default IncidentMap;
