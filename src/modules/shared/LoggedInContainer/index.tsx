import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  Layout,
  Menu,
  Icon,
  Input,
  Breadcrumb,
  Dropdown,
  Avatar,
  Spin,
} from 'antd';

const { Header, Sider, Footer, Content } = Layout;
const { Search } = Input;

import { Footer as CustomFooter } from '../Footer';
import { adminRoutes } from '../../../routes/adminRoutes';

import './index.less';

interface Props {
  children: any;
  history: any;
  location: any;
  match: any;
}

export default class LoggedInContainer extends React.PureComponent<Props, {}> {

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

  getMenuItem = (element: any) => {
    if (!element.showMenu) {
      return;
    }

    return (
      <Menu.Item key={element.path} onClick={this.onMenuNavigate}>
        <Icon type={element.icon} />
        <span>{element.name}</span>
      </Menu.Item>
    );
  };

  onMenuClick = (ev: any) => {
    console.log(ev);
  }

  render() {
    console.log(this.props);
    const breadcrumbs = this.props.location.pathname.split('/');
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled={true}>
          <Icon type="user" />
          <span className="userMenuItem">Menu item</span>
        </Menu.Item>
        <Menu.Item disabled={true}>
          <Icon type="setting" />
          <span className="userMenuItem">Menu item</span>
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          <span className="userMenuItem">Menu item</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <span className="userMenuItem">Logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout className="container">
        <Sider
          trigger={null}
          collapsible={true}
          breakpoint="lg"
          width={256}
          className="sider"
          collapsed={this.state.collapsed}>
          <div className="logo">
            <Link to="/">
              { this.state.collapsed ? null : (<h1>Kármán</h1>) }
              <Icon
                type="rocket"
                style={{ fontSize: 18, marginLeft: 10, fontWeight: 100, color: "#fff" }}
              />
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.props.location.pathname]}>
            {adminRoutes.map(this.getMenuItem)}
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="right">
              <div className="search action">
                <Search
                  onSearch={this.onSearch}
                  placeholder="Cu ce te putem ajuta azi?"
                />
              </div>
              {'user' ? (
                <Dropdown overlay={menu}>
                  <span className="action account">
                    <Avatar size="small" className="avatar" icon="user"/>
                    <span className="name">Some Guy</span>
                  </span>
                </Dropdown>
              ) : (
                <Spin size="small" style={{ marginLeft: 8 }} />
              )}
            </div>
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
          <Content style={{ margin: '24px 16px', minHeight: 280 }}>
            { this.props.children }
          </Content>
          <Footer>
            <CustomFooter />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
