import * as React from 'react';

import { graphql, ChildMutateProps } from 'react-apollo';
import gql from 'graphql-tag';
import { LoginMutation, LoginMutationVariables } from '../../../types/graphql-types';

interface Props {
  children: (
    data: { submit: (values: LoginMutationVariables) => Promise<null> }
  ) => JSX.Element | null;
}

class LoginController extends React.PureComponent<
  ChildMutateProps<Props, LoginMutation, LoginMutationVariables>
> {
  submit = async (values: LoginMutationVariables) => {
    const response = await this.props.mutate({
      variables: values
    });

    if (response.data.login) {
      return Promise.reject(response.data.login);
    }
    return null;
  }

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      path
      message
    }
  }
`;

export default graphql<
  Props,
  LoginMutation,
  LoginMutationVariables
>(loginMutation)(LoginController)
