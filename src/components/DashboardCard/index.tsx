import * as React from 'react';
import { Component } from 'react';

import { Card, Icon } from 'antd';

const { Meta } = Card;

interface IDashboardCardProps {
  content: JSX.Element;
  avatar?: JSX.Element;
  title: string;
  description: string;
  style: any;
}

class DashboardCard extends Component<IDashboardCardProps, {}> {
  static propTypes: IDashboardCardProps;

  render(): JSX.Element {
    const { content, avatar, title, description, style } = this.props;

    return (
      <Card
        style={style}
        cover={content}
        actions={[
          <Icon type="setting" key="1"/>,
          <Icon type="edit"  key="2"/>,
          <Icon type="ellipsis"  key="3"/>
        ]}
      >
        <Meta
          avatar={avatar}
          title={title}
          description={description}
        />
      </Card>
    );
  }
};

export default DashboardCard;
