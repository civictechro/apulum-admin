import * as React from 'react';

import { Card, Alert, List, Icon, Layout, Menu } from 'antd';
const { Content, Sider } = Layout;
const { SubMenu } = Menu;

import LoggedInContainer from '../../shared/LoggedInContainer';
import {
  IncidentReportQueryProps,
} from '../controller/IncidentReportController';

import {StaticMap} from 'react-map-gl';

import './IncidentReportView.less';
import { MAPBOX_TOKEN, MAPBOX_STYLE } from '../../shared/MapboxCard';
import { IncidentReportQuery_incidentReports } from '../../../types/graphql-types';
import { Link } from 'react-router-dom';
import { IncidentStatusExpand } from '../../shared/IncidentCard/constants';
import { IncidentReport } from '../../shared/IncidentCard/types';

interface Props {
  history: any;
  location: any;
  match: any;
  data: IncidentReportQueryProps;
}

export default class IncidentReportView extends React.PureComponent<Props, {}> {
  renderIncident = (report: IncidentReportQuery_incidentReports) => {
    const IconText = ({ type, text }: any) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const formattedDate = new Date(report.createdAt)
      .toISOString()
      .substring(0, 10);

    let commentCount = 0;
    if (report.comments) {
      commentCount = report.comments.length;
    }

    return (
      <List.Item
        key={report.title}
        actions={[
          <Link to={`/dispecerat/incidente/${report.id}`} key="1">
            <IconText type="edit" text="Actualizează"/>
          </Link>,
          <IconText type="message" text={commentCount}  key="2"/>
        ]}
        extra={
          <StaticMap
            latitude={report.latitude}
            longitude={report.longitude}
            zoom={14}
            width={280}
            height={180}
            mapboxApiAccessToken={MAPBOX_TOKEN as string}
            mapStyle={MAPBOX_STYLE as string}
            resuseMaps={true}
          />
        }>
        <List.Item.Meta
          title={<a href={`/dispecerat/incidente/${report.id}`}>{report.title}</a>}
          description={`${report.creator.email}, ${formattedDate}`}
        />
        {report.description}
      </List.Item>
    );
  }

  buildMenu = () => {
    const { incidentReports } = this.props.data.incidentReportQuery;

    return Object.keys(IncidentStatusExpand).map((key, _) => (
      <SubMenu
        key={IncidentStatusExpand[key].text}
        title={
          <span>
            <Icon type={IncidentStatusExpand[key].icon} style={{ color: IncidentStatusExpand[key].color }}/>
            {IncidentStatusExpand[key].text}
          </span>
        }>
        {incidentReports.map((value: IncidentReport, idx: number) => {
          console.log(key, value.title, value.status, idx, value.status === key);
          if (value.status !== key) {
            return null;
          }

          return (
              <Menu.Item key={idx}>
                <Link to={`/dispecerat/incidente/${value.id}`} key={idx}>{value.title}</Link>
              </Menu.Item>
          );
        })}

      </SubMenu>
    ));
  }

  render() {
    const {
      loading,
      error,
      incidentReports,
    } = this.props.data.incidentReportQuery;

    if (loading) {
      return <Card loading={ true } />;
    }

    if (error) {
      console.log(error);
      return <Alert message="Error" type="error" />;
    }

    // console.log(incidentReports)

    return (
      <LoggedInContainer {...this.props}>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}>
              {this.buildMenu()}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                pageSize: 4,
              }}
              dataSource={incidentReports}
              renderItem={this.renderIncident}
            />
          </Content>
        </Layout>
      </LoggedInContainer>
    );
  }
}
