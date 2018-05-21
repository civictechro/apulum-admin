import * as React from 'react';
import { Component } from 'react';

import { Card } from 'antd';

const { Meta } = Card;

interface IDashboardCardProps {
  content: JSX.Element;
  avatar?: JSX.Element;
  title: string;
  description: string;
  actions?: JSX.Element[];
}

class DashboardCard extends Component<IDashboardCardProps, {}> {
  static propTypes: IDashboardCardProps;

  render(): JSX.Element {
    const { content, avatar, title, description, actions } = this.props;

    return (
      <Card
        cover={content}
        actions={actions}>
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
