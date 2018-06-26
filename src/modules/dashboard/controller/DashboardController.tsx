import * as React from 'react';
import gql from 'graphql-tag';
import { DashboardQuery } from '../../../types/graphql-types';
import { graphql, ChildDataProps } from 'react-apollo';

interface Props {
  children: (
    data: {
      dashboardQuery: any;
    }
  ) => JSX.Element | null;
}

class DashboardController extends React.PureComponent<ChildDataProps<Props, DashboardQuery, {}>> {
  render() {
    const data = this.props.data;
    return this.props.children({
      dashboardQuery: data,
    });
  }
}

const dashboardQuery = gql`
  query DashboardQuery {
    incidentReports {
      status
      title
      description
    }
    tasks {
      title
    }
    users {
      id
    }
  }
`;

export default graphql<
  Props,
  DashboardQuery
>(dashboardQuery)(DashboardController)
