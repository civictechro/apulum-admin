import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Input, Icon, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

interface IRegisterProps {
  history: any;
  location: any;
  match: any;
}

const styles = {
  registerForm: {
    maxWidth: "300px",
    margin: "0 auto",
    marginTop: "120px",
  },
  registerFormForgot: {
    float: "right",
  } as React.CSSProperties,
  registerFormButton: {
    width: "100%",
  }
};

const registerMutation = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`

class RegisterLayout extends React.Component<IRegisterProps, {}> {
  static propTypes: IRegisterProps;

  render() {
    let email: any = {};
    let password: any = {};

    return (
      <Mutation mutation={registerMutation}>
        {(register, { data, loading, error }) => {
          let responseBlock = null;
          if (data && data.register === null) {
            // return <Redirect to='/admin'/>;
            responseBlock = (
              <p>Logged in?!</p>
            );
          }

          if (data && data.register) {
            responseBlock = (
              <div>
                <div>Path: { data.register[0].path }</div>
                <div>Message: { data.register[0].message }</div>
              </div>
            )
          }
          
          return (
            // tslint:disable-next-line jsx-no-lambda
            <Form onSubmit={e => {
                e.preventDefault();
                register({ variables: { email: email.input.value, password: password.input.value } });
                email = {};
                password = {};
              }}
              style={ styles.registerForm }>
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
                <Button type="primary" htmlType="submit"  style={ styles.registerFormButton }>
                  Register
                </Button>
              </FormItem>

            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default RegisterLayout;
