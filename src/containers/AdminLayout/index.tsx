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
} from 'antd';

import { adminRoutes } from '../../common/adminRoutes';
import { Route } from 'react-router-dom';

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
    WebkitBackgroundClip: "text",
    color: "transparent",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 20,
  } as React.CSSProperties,
  logo: {
    height: "32px",
    lineHeight: "32px",
    color: "#fff",
    fontSize: "18px",
    margin: "16px",
  },
};

interface IAdminLayoutProps {
  history: any;
  location: any;
  match: any;
}

class AdminLayout extends React.Component<IAdminLayoutProps, {}> {
  static propTypes: IAdminLayoutProps;

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

  onMenuNavigate = ({ key }: any) => {
    this.props.history.push(key);
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}>
          <div style={ styles.logo }>
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.location.pathname]}>
            {
              adminRoutes.map(element => {
                if (!element.showMenu) {
                  return;
                }

                return (
                  <Menu.Item key={element.path} onClick={this.onMenuNavigate}>
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
            {
              adminRoutes.map(element => {
                return (
                  // tslint:disable-next-line jsx-no-lambda
                  <Route exact={true} key={element.path} path={element.path} component={element.view} />
                );
              })
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AdminLayout;
