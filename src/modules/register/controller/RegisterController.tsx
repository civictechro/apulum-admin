import * as React from 'react';

import { graphql, ChildMutateProps } from 'react-apollo';
import gql from 'graphql-tag';
import { RegisterMutation, RegisterMutationVariables } from '../../../types/graphql-types';

interface Props {
  children: (
    data: { submit: (values: RegisterMutationVariables) => Promise<null> }
  ) => JSX.Element | null;
}

class RegisterController extends React.PureComponent<
  ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (values: RegisterMutationVariables) => {
    const response = await this.props.mutate({
      variables: values
    });

    if (response.data.register) {
      return Promise.reject(response.data.register);
    }
    return null;
  }

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

export default graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(RegisterController)
