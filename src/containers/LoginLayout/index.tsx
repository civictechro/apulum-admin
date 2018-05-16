import * as React from 'react';

import { Mutation, Query } from "react-apollo";
import gql from 'graphql-tag'

import { Form, Icon, Input, Button } from 'antd';
// import { Redirect } from 'react-router-dom';
const FormItem = Form.Item;

interface ILoginProps {
  history: any;
  location: any;
  match: any;
  form?: any;
}

const styles = {
  loginForm: {
    maxWidth: "300px",
    margin: "0 auto",
    marginTop: "120px",
  },
  loginFormForgot: {
    float: "right",
  } as React.CSSProperties,
  loginFormButton: {
    width: "100%",
  }
};

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      path
      message
    }
  }
`

const meQuery = gql`
  query meLogin {
    me {
      id
      email
    }
  }
`

class LoginLayout extends React.Component<ILoginProps, {}> {
  static propTypes: ILoginProps;

  render() {
    let email: any = {};
    let password: any = {};

    return (
      <Query query={meQuery}>
        {({ loading: qloading, error: qerror, data: qdata }) => {
          if (qloading) {
            return <p>Loading...</p>;
          }

          if (qerror) {
            console.log(qerror);
            return <p>Error :(</p>;
          }

          console.log(qloading, qerror, qdata);

          return (
            <Mutation mutation={loginMutation}>
              {(login, { data, loading, error }) => {
                let responseBlock = null;
                if (data && data.login === null) {
                  // return <Redirect to='/admin'/>;
                  responseBlock = (
                    <p>Logged in?!</p>
                  );
                }

                if (data && data.login) {
                  responseBlock = (
                    <div>
                      <div>Path: { data.login[0].path }</div>
                      <div>Message: { data.login[0].message }</div>
                    </div>
                  )
                }

                return (
                  // tslint:disable-next-line jsx-no-lambda
                  <Form onSubmit={e => {
                      e.preventDefault();
                      login({ variables: { email: email.input.value, password: password.input.value } });
                      email = {};
                      password = {};
                    }}
                    style={ styles.loginForm }>
                    { responseBlock }
                    <FormItem>
                      <Input
                        prefix={
                          <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        placeholder="Email"
                        // tslint:disable-next-line jsx-no-lambda
                        ref={node => { email = node; }}
                      />
                    </FormItem>

                    <FormItem>
                      <Input
                        prefix={
                          <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        type="password"
                        placeholder="Password"
                        ref={node => { password = node; }}
                      />
                    </FormItem>

                    <FormItem>
                      <Button type="primary" htmlType="submit"  style={ styles.loginFormButton }>
                        Log in
                      </Button>
                    </FormItem>

                  </Form>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default LoginLayout;
