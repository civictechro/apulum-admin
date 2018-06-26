import * as React from 'react';

import { graphql, ChildMutateProps } from 'react-apollo';
import gql from 'graphql-tag';

import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
} from '../../../types/graphql-types';

interface Props {
  children: (
    data: { submit: (values: ForgotPasswordMutationVariables) => Promise<null> }
  ) => JSX.Element | null;
}

class ForgotPasswordController extends React.PureComponent<
  ChildMutateProps<Props, ForgotPasswordMutation, ForgotPasswordMutationVariables>
> {
  submit = async (values: ForgotPasswordMutationVariables) => {
    await this.props.mutate({
      variables: values
    });
    return null;
  }

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordMutation = gql`
  mutation ForgotPasswordMutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

export default graphql<
  Props,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>(forgotPasswordMutation)(ForgotPasswordController)
