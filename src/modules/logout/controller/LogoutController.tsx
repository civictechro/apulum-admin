import * as React from 'react';

import { graphql, ChildMutateProps } from 'react-apollo';
import gql from 'graphql-tag';
import { LogoutMutation } from '../../../types/graphql-types';

interface Props {
  children: (
    data: { submit: () => Promise<boolean | null> }
  ) => JSX.Element | null;
}

class LogoutController extends React.PureComponent<
  ChildMutateProps<Props, LogoutMutation>
> {
  submit = async () => {
    const response = await this.props.mutate();
    return response.data.logout;
  }

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

export default graphql<
  Props,
  LogoutMutation
>(logoutMutation)(LogoutController)
