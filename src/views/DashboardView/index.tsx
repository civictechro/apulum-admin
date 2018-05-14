import * as React from 'react';
import { Component } from 'react';

import { Table, Row, Col } from 'antd';

import {
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  Bar,
  BarChart
} from 'recharts';

import IncidentMap from '../../components/IncidentMap';
import DashboardCard from '../../components/DashboardCard';

interface IDashboardViewProps {
  style?: any;
}

class DashboardView extends Component<IDashboardViewProps, {}> {
  static propTypes: IDashboardViewProps;

  render(): JSX.Element {
    const { style } = this.props;

    const mapViewport = {
      width: 400,
      height: 200,
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

    const chartData = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 9890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

    const dataSource = [{
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    }, {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }];

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }];

    return (
      <div style={style}>
        <Row gutter={20}>
          <Col span={6}>
            <DashboardCard
              content={<IncidentMap viewport={mapViewport} settings={mapSettings} />}
              title="Rapoarte cetățeni"
              description=""
              style={{ maxWidth: mapViewport.width, overflow: 'hidden' }}
            />
          </Col>
          <Col span={6}>
            <DashboardCard
              content={
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <Tooltip />
                    <Area type="monotone" dataKey="pv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="uv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              }
              title="Statistică turiști cetate"
              description=""
              style={{ maxWidth: mapViewport.width, overflow: 'hidden' }}
            />
          </Col>
          <Col span={6}>
            <DashboardCard
              content={
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <Tooltip />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              }
              title="Statistică turiști cetate"
              description=""
              style={{ maxWidth: mapViewport.width, overflow: 'hidden' }}
            />
          </Col>
          <Col span={6}>
            <DashboardCard
              content={
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <Tooltip />
                    <Bar dataKey="uv" fill="#339" />
                  </BarChart>
                </ResponsiveContainer>
              }
              title="Statistică turiști cetate"
              description=""
              style={{ maxWidth: mapViewport.width, overflow: 'hidden' }}
            />
          </Col>
        </Row>
        <Table dataSource={dataSource} columns={columns} style={{ marginTop: "20px" }}/>
      </div>
    );
  }
}

export default DashboardView;
