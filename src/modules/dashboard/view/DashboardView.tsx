import * as React from 'react';

import { Row, Col, Card, Alert } from 'antd';
// import { ScatterplotLayer } from 'deck.gl';

import LoggedInContainer from '../../shared/LoggedInContainer';
import TrendCard from '../../shared/TrendCard';
import { MapboxCard } from '../../shared/MapboxCard';

import './DashboardView.less';

interface Props {
  history: any;
  location: any;
  match: any;
  data: any;
}

export default class DashboardView extends React.PureComponent<Props, {}> {
  onMarkerClick = (incident: any) => {
    return (ev: any) => {
      console.log('incident', incident);
      console.log('propagated', ev);
    }
  }

  render() {
    const {
      loading,
      incidentReports,
      tasks,
      users,
      error
    } = this.props.data.dashboardQuery;

    if (loading) {
      return <Card loading={ true } />;
    }

    if (error) {
      console.log(error);
      return <Alert message="Error" type="error" />;
    }

    return (
      <LoggedInContainer  {...this.props}>
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <TrendCard
                title="Incidente raportate"
                description="Numarul de incidente raportate de catre cetateni in dispecerat"
                value={incidentReports.length}
              />
            </Col>
            <Col span={8}>
              <TrendCard
                title="Numarul total de task-uri"
                description="Numarul de task-uri din sistem"
                value={tasks.length}
              />
            </Col>
            <Col span={8}>
              <TrendCard
                title="Numarul total de useri"
                description="Numarul de useri din sistem"
                value={users.length}
              />
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 24 }}>
            <Col span={16} style={{ height: 400 }}>
              <MapboxCard
                markers={incidentReports.map((incident: any) => (
                  {
                    latitude: incident.latitude,
                    longitude: incident.longitude,
                    key: incident.id,
                    onClick: this.onMarkerClick(incident),
                    style: { fontSize: 20 },
                  }
                ))} />
            </Col>
          </Row>
        </div>
      </LoggedInContainer>
    );
  }
}
