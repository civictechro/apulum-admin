import * as React from 'react';

import ReactMapGL from 'react-map-gl';
import { AutoSizer } from 'react-virtualized';
import { MapboxMarker } from '../MapboxMarker';

const MAPBOX_STYLE = 'mapbox://styles/claudiuceia/cjiv1d3x162i92rno13ht2vao/';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

interface State {
  viewport: any;
}

interface Props {
  zoom?: number;
  markers?: [any];
}

const mapSettings = {
  dragPan: true,
  dragRotate: true,
  scrollZoom: true,
  touchZoom: true,
  touchRotate: true,
  keyboard: true,
  doubleClickZoom: true,
  minZoom: 0,
  maxZoom: 20,
  minPitch: 0,
  maxPitch: 85
}

export class MapboxCard extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 46.0688051,
        longitude: 23.5716845,
        zoom: this.props.zoom || 12,
        maxZoom: 18
      },
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  onViewportChange = (viewport: any) => {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  resize = () => {
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    // tslint:disable jsx-no-lambda
    const { markers } = this.props;

    return(
      <AutoSizer>
        {(args: any) => (
          <div>
            <ReactMapGL
              {...this.state.viewport}
              {...mapSettings}
              width={args.width}
              height={args.height}
              mapStyle={MAPBOX_STYLE}
              onViewportChange={(vw: any) => this.onViewportChange(vw)}
              mapboxApiAccessToken={MAPBOX_TOKEN}>
              {markers && markers.map((marker: any) => (
                <MapboxMarker
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                  onClick={marker.onClick}
                  key={'marker-' + marker.key}
                  style={Object.assign({ color: "#f00" }, marker.style)}
                />
              ))}
            </ReactMapGL>
          </div>
        )}
      </AutoSizer>
    );
  }
}