import * as React from 'react';

import { ChartCard, Field } from 'ant-design-pro/lib/Charts';
import { Icon, Tooltip } from 'antd';
import numeral from 'numeral';

// import { TrendLabel } from '../TrendLabel';

import './index.less';

interface TrendCardProps {
  title: string;
  description: string;
  value: number;
  footerValue?: number;
  footerLabel?: string;
  labels?: React.ReactNode[]
}

export class TrendCard extends React.PureComponent<TrendCardProps> {
  // tslint:disable jsx-no-lambda
  render() {
    return(
      <div className="container">
        <ChartCard
          title={ this.props.title }
          action={
            <Tooltip title={ this.props.description }>
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={() => (<span>{numeral(this.props.value).format("0,0")}</span>)}
          footer={ this.props.footerLabel || this.props.footerValue
            ? (<Field
              label={ this.props.footerLabel }
              value={numeral(this.props.footerValue).format("0,0")}
            />)
            : null
          }
          contentHeight={46}>
          {this.props.labels && this.props.labels.map((label) => label)}
        </ChartCard>
      </div>
    );
  }
}
