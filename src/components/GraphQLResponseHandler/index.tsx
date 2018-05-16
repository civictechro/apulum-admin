import {Component} from 'react';
import { Spin, Alert, Card } from 'antd';
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
      return (
        <Card>
          <Spin style={{ margin: "0 auto", display: "block", padding: "20px" }} size="large" />
        </Card>
      );
    }

    if (error) {
      return (
        <Alert
          style={{ margin: "0 auto" }}
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
