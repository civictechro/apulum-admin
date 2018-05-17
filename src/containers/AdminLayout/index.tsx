import * as React from 'react';

import {
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
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GraphQLResponseHandler from '../../components/GraphQLResponseHandler';
import UserHeaderOptions from '../../components/UserHeaderOptions';

const { Header, Sider, Content, Footer } = Layout;
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

const meHeaderQuery = gql`
  query me {
    me {
      id
      email
      firstName
      lastName
    }
  }
`

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

  capitalize = (el: string) => {
    return el.charAt(0).toUpperCase() + el.slice(1);
  }

  render() {
    const breadcrumbs = this.props.location.pathname.split('/');

    return (
      <Query query={meHeaderQuery}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return <GraphQLResponseHandler error={error} loading={loading} />
          }

          return (
            <Layout style={{ minHeight: "100vh" }}>
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
                    <Col span={13}>
                    <Search
                      onSearch={this.onSearch}
                      style={ styles.search }
                      placeholder="Cu ce te putem ajuta azi?" />
                    </Col>
                    <Col span={10}>
                      <Row justify="end" type="flex" style={{ paddingRight: "24px" }} gutter={20}>
                        <Col style={{ marginRight: "10px" }}>
                          <Badge count={10}>
                            <Button shape="circle" icon="notification" size="large" />
                          </Badge>
                        </Col>
                        <Col>
                          <Button shape="circle" icon="lock" size="large" />
                        </Col>
                        <Col>
                          <UserHeaderOptions email={ data.me.email } />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Header>

                <Breadcrumb style={{ margin: '16px 24px', marginBottom: 0 }}>
                  {
                    breadcrumbs.map((element: string) => {
                      if (!element) {
                        return;
                      }

                      return (
                        <Breadcrumb.Item key={element}>
                          {this.capitalize(element)}
                        </Breadcrumb.Item>
                      );
                    })
                  }
                </Breadcrumb>
                <Content style={{ minHeight: 300, overflow: 'initial', padding: "16px" }}>
                  {
                    adminRoutes.map(element => {
                      return (
                        <Route exact={true} key={element.path} path={element.path} component={element.view} />
                      );
                    })
                  }
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  CivicTech România © 2018
                </Footer>
              </Layout>
            </Layout>
          )
        }}
      </Query>
    );
  }
}

export default AdminLayout;
