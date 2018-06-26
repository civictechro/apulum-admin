import * as React from 'react';
import { Footer as CustomFooter } from '../Footer';
import Icon from 'antd/lib/icon';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

import './index.less';

interface Props {
  children: any,
  id?: string,
  otherProps?: any,
}

export const LoggedOutContainer: React.SFC<Props> = ({ children, ...props }) => {
  return (
    <Layout className="logged-out-container" {...props} >
      <Header style={{ background: 'transparent', textAlign: 'center', height: '220px', lineHeight: '220px' }}>
        <h1>
          <span className="fancyBgText">Kármán</span>
          <Icon type="rocket" className="fancyBgText" style={{ marginLeft: 15 }}/>
        </h1>
      </Header>
      <Content>
        { children }
      </Content>
      <Footer>
        <CustomFooter />
      </Footer>
    </Layout>
  );
}
