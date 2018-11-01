import * as React from 'react';

import { Row, Col, Card, Alert, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import LoggedInContainer from '../../shared/LoggedInContainer';
import { TrendCard } from '../../shared/TrendCard';
import { IncidentMap } from '../../shared/IncidentMap';
import IncidentMapComposer from '../../shared/IncidentMapComposer';

import {
  DashboardQueryProps,
  DashboardMutationProps
} from '../controller/DashboardController';

import './DashboardView.less';
import { TrendLabel, TrendDirection } from '../../shared/TrendLabel';
import { IncidentReport } from '../../shared/IncidentCard/types';

const ONE_DAY = 60 * 60 * 24 * 1000;

interface Props {
  history: any;
  location: any;
  match: any;
  data: DashboardQueryProps;
  mutations: DashboardMutationProps;
}

export default class DashboardView extends React.PureComponent<Props, {}> {
  saveNewIncident = async (data: any) => {
    await this.props.mutations.createIncidentReport({ input: data }).then((res) => {
      console.log(res);
    });
  }

  render() {
    const {
      loading,
      incidentReports,
      tasks,
      users,
      error,
      me
    } = this.props.data.dashboardQuery;

    if (loading) {
      return <Card loading={ true } />;
    }

    if (error) {
      console.log(error);
      return <Alert message="Error" type="error" />;
    }

    const now = Date.now();
    const createdTodayCounter = incidentReports.reduce((accu: number, incident: IncidentReport) => {
      if (!incident.createdAt) {
        return accu;
      }

      const incidentDate = Date.parse(incident.createdAt);
      if (now - incidentDate <= ONE_DAY) {
        return accu+1;
      }

      return accu;
    }, 0);

    const label = [
      <TrendLabel
        title="În ultimele 24h"
        direction={TrendDirection.Up}
        value={createdTodayCounter}
        key={createdTodayCounter}
      />,
    ];

    return (
      <LoggedInContainer {...this.props}>
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <TrendCard
                title="Incidente raportate"
                description="Numarul de incidente raportate de catre cetateni in dispecerat"
                value={incidentReports.length}
                labels={label}
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
                <Col span={24}>
                  <IncidentMap incidents={incidentReports} style={{ minHeight: 400 }} />
                </Col>
              </TabPane>
              <TabPane tab="Adauga incidente" key="2">
                <Col span={24}>
                  <IncidentMapComposer
                    style={{ minHeight: 400 }}
                    onSave={this.saveNewIncident}
                    userId={me.id}
                  />
                </Col>
              </TabPane>
            </Tabs>
          </Row>
        </div>
      </LoggedInContainer>
    );
  }
}
