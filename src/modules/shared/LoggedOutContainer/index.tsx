import * as React from 'react';
import { Footer as CustomFooter } from '../Footer';
import Icon from 'antd/lib/icon';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

import './index.less';

interface Props {
  children: any,
  id?: string,
  otherProps?: any;
}

export class LoggedOutContainer extends React.PureComponent<
  Props
> {
  render() {
    return (
      <Layout className="logged-out-container">
        <Header style={{ background: 'transparent', textAlign: 'center', height: '220px', lineHeight: '220px' }}>
          <h1>
            <span className="fancyBgText">Kármán</span>
            <Icon type="rocket" className="fancyBgText" style={{ marginLeft: 15 }}/>
          </h1>
        </Header>
        <Content>
          { this.props.children }
        </Content>
        <Footer>
          <CustomFooter />
        </Footer>
      </Layout>
    );
  }
}
