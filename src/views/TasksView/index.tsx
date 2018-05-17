import * as React from 'react';
import { Component } from 'react';

import { Query, Mutation } from "react-apollo";
import gql from 'graphql-tag'
import { List, Card, Avatar, Button, Modal, Form, Input } from 'antd';
import GraphQLResponseHandler from '../../components/GraphQLResponseHandler';

const FormItem = Form.Item;

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

const createTaskMutation = gql`
  mutation createTaskMutation($userId: ID!, $title: String!, $description: String!) {
    createTask(userId: $userId, title: $title, description: $description) {
      ... on Error {
        path
        message
      }
      ... on Task {
        id
        title
        description
      }
    }
  }
`

const meQuery = gql`
  query meOnTasks {
    me {
      id
      email
      firstName
      lastName
    }
  }
`

class TasksView extends Component {

  state = {
    isAddTaskModalOpen: false,
  }

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

  openNewTaskModal = () =>
    this.setState({ isAddTaskModalOpen: true });

  closeNewTaskModal = () =>
    this.setState({  isAddTaskModalOpen: false });

  toggleNewTaskModal = () =>
    this.setState({ isAddTaskModalOpen: !this.state.isAddTaskModalOpen });

  render(): JSX.Element {
    let title: any = {};
    let description: any = {};

    return (
      <Card>
        <Button
          onClick={this.openNewTaskModal}
          type="dashed"
          icon="plus"
          size="large"
          style={{ width: "100%", marginBottom: 20}}>
          Adauga task nou
        </Button>

        <Modal
          title="Adauga task nou"
          wrapClassName="vertical-center-modal"
          visible={this.state.isAddTaskModalOpen}
          onOk={this.closeNewTaskModal}
          onCancel={this.closeNewTaskModal}
        >
        <Query query={meQuery}>
        {({ loading: qloading, error: qerror, data: qdata }) => {
          if (qloading || qerror) {
            return <GraphQLResponseHandler error={qerror} loading={qloading} />
          }

          return (
            <Mutation mutation={createTaskMutation}>
              {(createTask, { data, loading, error }) => {
                if (loading || error) {
                  return <GraphQLResponseHandler error={error} loading={loading} />
                }

                // tslint:disable jsx-no-lambda
                return (
                  <Card>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        createTask({
                          variables: {
                            userId: qdata.me.id,
                            title: title.input.value,
                            description: description.input.value
                          }
                        })

                        title = {};
                        description = {};
                      }}
                      style={{ maxWidth: "300px" }}>
                      <FormItem>
                        <Input
                          placeholder="Titlu task"
                          ref={node => { title = node; }}
                        />
                      </FormItem>

                      <FormItem>
                        <Input
                          placeholder="Descriere task"
                          ref={node => { description = node; }}
                        />
                      </FormItem>

                      <FormItem>
                        <Button type="primary" htmlType="submit">
                          Adauga
                        </Button>
                      </FormItem>

                    </Form>
                  </Card>
                );
              }}
            </Mutation>
          );}}
          </Query>
        </Modal>

        <Query query={tasksQuery}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return <GraphQLResponseHandler error={error} loading={loading} />
            }

            return (
              <List
                itemLayout="horizontal"
                dataSource={data.tasks}
                renderItem={this.getListItem}
              />
            );
          }}
        </Query>
      </Card>
    );
  }
}

export default TasksView;
