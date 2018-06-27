import * as React from 'react';
import { Icon } from 'antd';

interface Props {
  icon: string;
  label: string;
  style?: any;
}

export class IconLabel extends React.PureComponent<Props> {
  render() {
    return(
      <span style={ this.props.style }>
        <Icon type={this.props.icon} style={{ marginRight: 6 }}/>
        {this.props.label}
      </span>
    );
  }
}
