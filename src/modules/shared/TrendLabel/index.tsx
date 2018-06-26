import * as React from 'react';

import Trend from 'ant-design-pro/lib/Trend';

export enum TrendDirection {
  Up = 'up',
  Down = 'down'
}

interface TrendLabelProps {
  title: string;
  direction: TrendDirection;
  flagStyle?: React.CSSProperties;
  value: number;
}

export class TrendLabel extends React.PureComponent<TrendLabelProps> {
  render() {
    return(
      <span>
        { this.props.title }
        <Trend
          flag={ this.props.direction }
          style={ this.props.flagStyle || { marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
          { this.props.value }%
        </Trend>
      </span>
    );
  }
}
