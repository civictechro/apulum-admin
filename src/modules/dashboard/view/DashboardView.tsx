import * as React from 'react';

import { Row, Col, Card, Alert, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import LoggedInContainer from '../../shared/LoggedInContainer';
import { TrendCard } from '../../shared/TrendCard';
import { MapboxCard } from '../../shared/MapboxCard';
import { IncidentMap } from '../../shared/IncidentMap';

import './DashboardView.less';

interface Props {
  history: any;
  location: any;
  match: any;
  data: any;
}

export default class DashboardView extends React.PureComponent<Props, {}> {
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
      <LoggedInContainer {...this.props}>
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

          <Row gutter={0} style={{ marginTop: 24 }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Incidente raportate" key="1">
                <Col span={24} style={{ height: 400 }}>
                  <IncidentMap incidents={incidentReports} style={{ height: 400 }} />
                </Col>
              </TabPane>
              <TabPane tab="Adauga incidente" key="2">
                <Col span={24} style={{ height: 400 }}>
                  <MapboxCard />
                </Col>
              </TabPane>
            </Tabs>
          </Row>
        </div>
      </LoggedInContainer>
    );
  }
}
