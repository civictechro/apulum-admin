import * as React from 'react';
import gql from 'graphql-tag';

import {
  CallCenterQuery,
  IncidentReportCreation,
  IncidentReportCreationVariables,
} from '../../../types/graphql-types';

import {
  graphql,
  ChildDataProps,
  compose,
  ChildMutateProps
} from 'react-apollo';
import { incidentReportCreationMutation } from '../../../queries/incidentReportCreationMutation';

export interface CallCenterQueryProps {
  callCenterQuery: any;
}

export interface CallCenterMutationProps {
  createIncidentReport: (
    incidentReportInput: IncidentReportCreationVariables
  ) => Promise<void>;
}

export interface CallCenterChildrenParams {
  queries: CallCenterQueryProps;
  mutations: CallCenterMutationProps;
}

interface Props {
  children: (params: CallCenterChildrenParams) => JSX.Element | null;
}

class CallCenterController extends React.PureComponent<
  ChildDataProps<Props, CallCenterQuery, {}>
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
        callCenterQuery: data,
      },
      mutations: {
        createIncidentReport: this.createIncidentReport
      }
    });
  }
}

const callCenterQuery = gql`
  query CallCenterQuery {
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
    me {
      id
      email
      firstName
      lastName
    }
  }
`;

export default compose(
  graphql<Props, CallCenterQuery>(callCenterQuery),
  graphql<
    Props,
    IncidentReportCreation,
    IncidentReportCreationVariables
  >(incidentReportCreationMutation)
)(CallCenterController)

