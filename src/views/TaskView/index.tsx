import * as React from 'react';
import { Component } from 'react';

import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Card, Button } from 'antd';
import GraphQLResponseHandler from '../../components/GraphQLResponseHandler';

const { Meta } = Card;

const singleTaskQuery = gql`
  query singleTaskQuery ($id: ID!) {
    task(id: $id) {
      id
      title
      description
      creator{
        id
        email
        firstName
        lastName
      }
      asignee{
        id
        email
        firstName
        lastName
      }
    }
  }
`

interface ISomeProps {
  match: {
    params: {
      id: string
    }
  }
}

class TaskView extends Component<ISomeProps & any, {}> {
  render(): JSX.Element {
    const { match } = this.props;

    return (
      <Query query={singleTaskQuery} variables={{ id: match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Card loading={loading} />;
          }

          if (error) {
            return <GraphQLResponseHandler error={error} loading={loading} />
          }

          return (
            <Card title={ data.task.title } extra={[
                <Button key="1" type="primary" style={{ marginRight: 16 }}>
                  Adauga task resolution
                </Button>,
                <Button key="2" type="primary">
                  Editeaza task
                </Button>,
              ]}>
              <Meta description={ data.task.description } />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default TaskView;
