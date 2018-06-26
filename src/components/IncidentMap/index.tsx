import * as React from 'react';

import {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Icon, Modal, Card, Form, Input, Button } from 'antd';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import GraphQLResponseHandler from '../GraphQLResponseHandler';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import FormItem from 'antd/lib/form/FormItem';

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

interface Coords {
  lat: number;
  lng: number;
}

interface IIncidentMapState {
  viewport: IMapBoxViewport;
  settings: IMapBoxSettings;
  isAddReportModalOpen?: boolean;
  selectedCoords?: Coords;
}

const meQuery = gql`
  query meOnIncidentMap {
    me {
      id
      email
      firstName
      lastName
    }
  }
`

const createIncidentReportMutation = gql`
  mutation createIncidentReportMutation($input: IncidentReportInput!) {
    createIncidentReport(input: $input) {
      ... on Error {
        path
        message
      }
      ... on IncidentReport {
        id
        title
      }
    }
  }
`

class IncidentMap extends Component<IIncidentMapProps, IIncidentMapState> {
  static propTypes: IIncidentMapProps;

  constructor(props: IIncidentMapProps) {
    super(props);
    if (props.viewport) {
      this.state = props;
    }
  }

  openNewTaskModal = () =>
    this.setState({ isAddReportModalOpen: true });

  closeNewTaskModal = () =>
    this.setState({  isAddReportModalOpen: false });

  toggleNewTaskModal = () =>
    this.setState({ isAddReportModalOpen: !this.state.isAddReportModalOpen });

  onViewportChange = (v: IMapBoxViewport) => {
    this.setState({viewport: v})
  }

  renderMarker = (incident: IIncidentReport, i: number) => {
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

  addMarker = (event: { lngLat: number[] }) => {
    console.log(event);

    this.setState({
      selectedCoords: {
        lat: event.lngLat[1],
        lng: event.lngLat[0],
      }
    });

    this.openNewTaskModal();
  }

  render() {
    const {viewport, settings } = this.state;
    const { incidents } = this.props;

    let title: any = {};
    let description: any = {};

    return (
      <AutoSizer>
        {(args: any) => (
          <div>
            <ReactMapGL
              width={args.width}
              height={args.height}
              {...viewport}
              {...settings}
              mapStyle="mapbox://styles/mapbox/dark-v9"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
              onViewportChange={this.onViewportChange}
              onClick={this.addMarker}>
                { incidents ? (incidents as IIncidentReport[]).map(this.renderMarker) : null }
            </ReactMapGL>

            <Modal
              title="Adauga incident"
              wrapClassName="vertical-center-modal"
              visible={this.state.isAddReportModalOpen}
              onOk={this.closeNewTaskModal}
              onCancel={this.closeNewTaskModal}>

              <Query query={meQuery}>
              {({ loading: qloading, error: qerror, data: qdata }) => {
                if (qloading || qerror) {
                  return <GraphQLResponseHandler error={qerror} loading={qloading} />
                }

                return (
                  <Mutation mutation={createIncidentReportMutation}>
                  {(createIncidentReport, { data, loading, error }) => {
                    if (loading || error) {
                      return <GraphQLResponseHandler error={error} loading={loading} />
                    }

                    console.log(data);

                    // tslint:disable jsx-no-lambda
                    return (
                      <Card>
                        <Form onSubmit={e => {
                            e.preventDefault();
                            if (!this.state.selectedCoords) {
                              console.warn('No coords selected');
                              return;
                            }

                            const incidentReportInput = {
                              userId: qdata.me.id,
                              title: title.input.value,
                              description: description.input.value,
                              latitude: this.state.selectedCoords.lat,
                              longitude: this.state.selectedCoords.lng,
                              type: "OTHER",
                            };

                            console.log(incidentReportInput);

                            createIncidentReport({
                              variables: {
                                input: incidentReportInput,
                              }
                            })

                            title = {};
                            description = {};
                          }}
                          style={{ maxWidth: "300px" }}>
                          <FormItem>
                            <Input
                              placeholder="Titlu raport"
                              ref={node => { title = node; }}
                            />
                          </FormItem>

                          <FormItem>
                            <Input
                              placeholder="Descriere raport"
                              ref={node => { description = node; }}
                            />
                          </FormItem>

                          <FormItem>
                            <Button type="primary" htmlType="submit">
                              Adauga
                            </Button>
                          </FormItem>

                        </Form>
                      </Card>
                    );
                  }}
                  </Mutation>
                );
              }}
              </Query>
            </Modal>
          </div>
        )}
      </AutoSizer>
    );
  }
}

export default IncidentMap;
