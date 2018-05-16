import * as React from 'react';
import { Component } from 'react';

import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { List, Card, Avatar } from 'antd';
import GraphQLResponseHandler from '../../components/GraphQLResponseHandler';

const tasksQuery = gql`
  query tasks {
    tasks {
      id
      title
      description
      creator {
        id
        email
        firstName
        lastName
      }
      asignee {
        id
        email
        firstName
        lastName
      }
    }
  }
`

class TasksView extends Component {
  getListItem = (item: any) => {
    return (
      <List.Item actions={[<a key="edit">edit</a>, <a key="more">more</a>]} key={item.id}>
        <List.Item.Meta
          avatar={<Avatar size="small" icon="check" />}
          title={<a href="">{item.title}</a>}
          description={item.description}
        />
        <div>{item.creator.email}</div>
      </List.Item>
    );
  }

  render(): JSX.Element {
   return (
    <Query query={tasksQuery}>
      {({ loading, error, data }) => {
        if (loading || error) {
          return <GraphQLResponseHandler error={error} loading={loading} />
        }

        return (
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={data.tasks}
              renderItem={this.getListItem}
            />
          </Card>
        );
      }}
    </Query>
   );
  }
}

export default TasksView;
