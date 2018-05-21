import * as React from 'react';

import {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Icon } from 'antd';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';

interface IMapBoxViewport {
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

export interface IIncidentReport {
  id: string;
  title: string;
  description: string;
  status: string; // TODO: make enum
  latitude: number;
  longitude: number;
  type: string; // TODO: make enum
  comments: any[];
}

interface IIncidentMapProps {
  viewport: IMapBoxViewport;
  settings: IMapBoxSettings;
  incidents?: IIncidentReport[];
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

  _renderMarker(incident: IIncidentReport, i: number) {
    const {title, latitude, longitude } = incident;

    return (
      <Marker key={i} longitude={longitude} latitude={latitude} >
        <div>
          <Icon
            type="environment"
            style={{ fontSize: "2em", color: "#d00" }}
            title={title}
          />
        </div>
      </Marker>
    );
  }

  render() {
    const {viewport, settings } = this.state;
    const { incidents } = this.props;

    return (
      <AutoSizer>
        {(args: any) => (
          <ReactMapGL
            width={args.width}
            height={args.height}
            {...viewport}
            {...settings}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
            onViewportChange={this.onViewportChange}>
              { (incidents as IIncidentReport[]).map(this._renderMarker) }
          </ReactMapGL>
        )}
      </AutoSizer>
    );
  }
}

export default IncidentMap;
