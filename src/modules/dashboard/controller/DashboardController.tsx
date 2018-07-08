import * as React from 'react';
import gql from 'graphql-tag';

import {
  DashboardQuery,
  IncidentReportCreation,
  IncidentReportCreationVariables,
} from '../../../types/graphql-types';

import {
  graphql,
  ChildDataProps,
  compose,
  ChildMutateProps
} from 'react-apollo';

export interface DashboardQueryProps {
  dashboardQuery: any;
}

export interface DashboardMutationProps {
  createIncidentReport: (
    incidentReportInput: IncidentReportCreationVariables
  ) => Promise<void>;
}

export interface DashboardChildrenParams {
  queries: DashboardQueryProps;
  mutations: DashboardMutationProps;
}

interface Props {
  children: (params: DashboardChildrenParams) => JSX.Element | null;
}

class DashboardController extends React.PureComponent<
  ChildDataProps<Props, DashboardQuery, {}>
  & ChildMutateProps<Props, IncidentReportCreation, IncidentReportCreationVariables>
> {
  createIncidentReport = async (incidentReportInput: IncidentReportCreationVariables) => {
    const response = await this.props.mutate({
      variables: incidentReportInput
    });

    const res = response.data.createIncidentReport;
    if (!res || (res[0] as any).path) {
      return Promise.reject(response.data.createIncidentReport);
    }

    if ((res[0] as any).id) {
      this.props.data.refetch();
    }

    return;
  }

  render() {
    const data = this.props.data;

    return this.props.children({
      queries: {
        dashboardQuery: data,
      },
      mutations: {
        createIncidentReport: this.createIncidentReport
      }
    });
  }
}

const dashboardQuery = gql`
  query DashboardQuery {
    incidentReports {
      id
      status
      title
      description
      latitude
      longitude
      type
      status
      createdAt
      updatedAt
    }
    tasks {
      title
    }
    users {
      id
    }
    me {
      id
      email
      firstName
      lastName
    }
  }
`;

const incidentReportCreationMutation = gql`
  mutation IncidentReportCreation($input: IncidentReportInput!) {
    createIncidentReport(input: $input) {
      ...on Error{
        path
        message
      }
      ...on IncidentReport {
        id
      }
    }
  }
`;

export default compose(
  graphql<Props, DashboardQuery>(dashboardQuery),
  graphql<
    Props,
    IncidentReportCreation,
    IncidentReportCreationVariables
  >(incidentReportCreationMutation)
)(DashboardController)

