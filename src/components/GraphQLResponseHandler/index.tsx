import {Component} from 'react';
import { Spin, Alert } from 'antd';
import React from 'react';

interface IGraphQLResponseHandlerProps {
  loading: boolean;
  error: any;
}

class GraphQLResponseHandler extends Component<IGraphQLResponseHandlerProps, {}> {
  static propTypes: IGraphQLResponseHandlerProps;

  render() {
    const { loading, error } = this.props;
    if (loading) {
      return <Spin size="large" />;
    }

    if (error) {
      return (
        <Alert
          message="Error"
          description="Error ocurred, please try again later"
          type="error"
          showIcon={true}
        />
      );
    }

    return null;
  }
}

export default GraphQLResponseHandler;
