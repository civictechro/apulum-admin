import * as React from 'react';
import { Menu, Icon } from 'antd';

import './index.less';

interface ItemProps {
  icon: string;
  label: string;
}

interface Props {
  onClick: ((event: any) => void);
  items: ItemProps[];
}

export class UserMenu extends React.PureComponent<Props> {
  render() {
    return(
      <Menu className="menu" selectedKeys={[]} onClick={this.props.onClick}>
        {this.props.items.map((item) => (
          <Menu.Item key={item.label}>
            <Icon type={item.icon} />
            <span className="userMenuItem">{item.label}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
}}
