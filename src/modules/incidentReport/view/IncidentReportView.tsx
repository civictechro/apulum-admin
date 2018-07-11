import * as React from 'react';

import { Card, Alert, List, Icon } from 'antd';

import LoggedInContainer from '../../shared/LoggedInContainer';
import {
  IncidentReportQueryProps,
} from '../controller/IncidentReportController';

import {StaticMap} from 'react-map-gl';

import './IncidentReportView.less';
import { MAPBOX_TOKEN, MAPBOX_STYLE } from '../../shared/MapboxCard';
import { IncidentReportQuery_incidentReports } from '../../../types/graphql-types';
import { Link } from 'react-router-dom';

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

    console.log(incidentReports)

    return (
      <LoggedInContainer {...this.props}>
        <div style={{ background: '#fff', padding: 16 }}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 4,
          }}
          dataSource={incidentReports}
          renderItem={this.renderIncident}
        />
        </div>
      </LoggedInContainer>
    );
  }
}
