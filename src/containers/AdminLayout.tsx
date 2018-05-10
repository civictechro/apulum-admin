import * as React from 'react';

import {
  Avatar,
  Button,
  Layout,
  Menu,
  Icon,
  Input,
  Badge,
  Row,
  Col,
  Breadcrumb,
  Table
} from 'antd';

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

import { menuData } from '../common/menuData';
import IncidentMap from '../components/IncidentMap';
import DashboardCard from '../components/DashboardCard';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const styles = {
  trigger: {
    fontSize: "18px",
    lineHeight: "64px",
    padding: "0 24px",
    cursor: "pointer",
    transition: "color .3s",
    '&:hover': {
      color: "#1890ff",
    }
  },
  headerIcon: {
    marginLeft: "15px",
  },
  headerWideIcon: {
    marginLeft: "-80px",
  },
  logo: {
    height: "32px",
    lineHeight: "32px",
    color: "#fff",
    fontSize: "18px",
    margin: "16px",
  },
  search: {
    minWidth: "40%",
    display: "inline-block",
    width: 'unset',
  },
  fancyBg: {
    background: `linear-gradient(
      103deg,
      rgba(49, 220, 207, .6),
      rgba(36, 79, 231, .6)
    )`,
  },
  fancyBgText: {
    backgroundImage: `linear-gradient(
      103deg,
      rgba(49, 220, 207),
      rgba(36, 79, 231)
    )`,
    "-webkit-background-clip": "text",
    color: "transparent",
    "text-transform": "uppercase",
    "font-weight": "bold",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 20,
  }
};

class AdminLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onSearch = (value: string) => {
    console.log(value)
  }

  render() {
    const menuHighlighted = [
      menuData[0].path
    ];

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
      <Layout>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}>
          <div className="logo" style={ styles.logo }>
            <span style={ styles.fancyBgText }>
              {
                this.state.collapsed
                  ? null
                  : (<span>Kármán</span>)
              }
              <Icon
                type="rocket"
                style={{ fontSize: 18, marginLeft: 10, fontWeight: 100, color: "#fff" }}
              />
            </span>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={menuHighlighted}>
            {
              menuData.map(element => {
                return (
                  <Menu.Item key={element.path}>
                    <Icon type={element.icon} />
                    <span>{element.name}</span>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row>
              <Col span={1}>
                <Icon
                  style={ styles.trigger }
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Col>
              <Col span={18}>
              <Search
                onSearch={this.onSearch}
                style={ styles.search }
                placeholder="Cu ce te putem ajuta azi?" />
              </Col>
              <Col span ={5}>
                <Row justify="end" type="flex" style={{ paddingRight: "24px" }} gutter={20}>
                  <Col style={{ marginRight: "10px" }}>
                    <Badge count={10}>
                      <Button shape="circle" icon="notification" size="large" />
                    </Badge>
                  </Col>
                  <Col>
                    <Avatar size="large" icon="user" shape="square" style={ styles.fancyBg } />
                  </Col>
                  <Col>
                    <Button shape="circle" icon="lock" size="large" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>

          <Breadcrumb style={{ margin: '16px 24px', marginBottom: 0 }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ margin: '16px 16px', padding: 24, background: '#fff', minHeight: 300, overflow: 'initial' }}>
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
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AdminLayout;
