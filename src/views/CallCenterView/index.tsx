import * as React from 'react';
import { Component } from 'react';
import IncidentMap, { IIncidentReport } from '../../components/IncidentMap';
import { Row, Col, Card, List, Avatar, Icon, Layout } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GraphQLResponseHandler from '../../components/GraphQLResponseHandler';
import MapboxGeocoder from '../../components/MapboxGeocoder';

const { Header, Sider, Content } = Layout;

interface ICallCenterViewState {
  width?: number;
  height?: number;
  collapsed: boolean;
}

const incidentsQuery = gql`
  query incidentReports {
    incidentReports{
      title
      id
      description
      status
      type
      latitude
      longitude
      creator{
        firstName
        email
        id
      }
      comments{
        comment
        newStatus
        oldStatus,
        id
      }
    }
  }
`

/*
enum INCIDENT_REPORT_TYPES {
  OTHER,
  PARKING,
  TRASH,
}
*/

interface IconTextParams {
  type: string;
  text: string;
}

const IconText = ({ type, text }: IconTextParams ) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class CallCenterView extends Component<{}, ICallCenterViewState> {

  state: ICallCenterViewState = {
    collapsed: false,
  };

  getIncidentReport = (incident: IIncidentReport) => (
    <List.Item actions={[
        <IconText type="star-o" text="156" key="star"/>,
        <IconText type="like-o" text="156" key="like"/>,
        <IconText type="message" text={incident.comments.length.toString()}  key="message"/>
      ]}
      key={incident.id}>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">{incident.title}</a>}
        description={incident.status + ' / ' + incident.type}
      />
    </List.Item>
  )

  parseNewReports = (reports: IIncidentReport[]) => {
    if (!reports) {
      return {total: 0, totalNew: 0};
    }

    const total = reports.length;
    let totalNew = 0;
    reports.map((rep) => totalNew += rep.status === "NEW" ? 1 : 0);

    return {
      total,
      totalNew
    };
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render(): JSX.Element {
    const mapViewport = {
      latitude: 46.0688051,
      longitude: 23.5716845,
      zoom: 11
    };

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

    return (
      <Query query={incidentsQuery}>
      {({ loading, error, data }) => {
        if (error) {
          return <GraphQLResponseHandler error={error} loading={loading} />
        }

        console.log(data);

        const { total, totalNew } =
          this.parseNewReports(data.incidentReports);

        return (
          <div>
            <Row style={{ marginBottom: 20 }}>
              <Col span={6}>
                <Card>
                  Total: {total}
                  New: {totalNew}
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card bodyStyle={{ padding: 0 }} loading={loading}>
                  <Layout>
                    <Header style={{ background: '#fff', paddingLeft: 20 }}>
                      <Row gutter={20}>
                        <Col span={8}>
                          <MapboxGeocoder />
                        </Col>
                      </Row>
                    </Header>
                    <Layout>
                      <Content>
                        <div style={{ overflow: "hidden", height: "100%" }}>
                          <IncidentMap
                            viewport={ mapViewport }
                            settings={ mapSettings }
                            incidents={ data.incidentReports }
                          />
                        </div>
                      </Content>
                      <Sider
                        style={{ background: "#fff" }}
                        width={350}
                        collapsible={true}
                        trigger={null}
                        collapsed={ this.state.collapsed }>
                        <Icon
                          style={{
                            fontSize: 18,
                            display: "inline-block",
                            width: "100%",
                            marginTop: 20,
                            textAlign: "center",
                            cursor: "pointer"
                          }}
                          className="trigger"
                          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                          onClick={this.onCollapse}
                        />
                        <div style={{ minHeight: 300, overflow: "hidden", padding: 20 }}>
                          {!this.state.collapsed
                            ? <List
                              itemLayout="vertical"
                              dataSource={data.incidentReports}
                              renderItem={this.getIncidentReport}
                            />
                            : null
                          }
                        </div>
                      </Sider>
                    </Layout>
                  </Layout>
                </Card>
              </Col>
            </Row>
          </div>
        );
      }}
      </Query>
    );
  }
}

export default CallCenterView;
