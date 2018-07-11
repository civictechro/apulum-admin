import * as React from 'react';
import gql from 'graphql-tag';

import {
  ProfileQuery,
} from '../../../types/graphql-types';

import {
  graphql,
  ChildDataProps,
} from 'react-apollo';

export interface ProfileQueryProps {
  profileQuery: any;
}

export interface ProfileChildrenParams {
  queries: ProfileQueryProps;
}

interface Props {
  children: (params: ProfileChildrenParams) => JSX.Element | null;
}

class ProfileController extends React.PureComponent<
  ChildDataProps<Props, ProfileQuery, {}>
> {
  render() {
    const data = this.props.data;

    return this.props.children({
      queries: {
        profileQuery: data,
      },
    });
  }
}

const profileQuery = gql`
  query ProfileQuery {
    me {
      id
      email
      firstName
      lastName
    }
  }
`;

export default graphql<
  Props,
  ProfileQuery
>(profileQuery)(ProfileController)

