import * as React from 'react';
import gql from 'graphql-tag';

import {
  IncidentReportQuery,
} from '../../../types/graphql-types';

import {
  graphql,
  ChildDataProps,
} from 'react-apollo';

export interface IncidentReportQueryProps {
  incidentReportQuery: any;
}

export interface IncidentReportChildrenParams {
  queries: IncidentReportQueryProps;
}

interface Props {
  children: (params: IncidentReportChildrenParams) => JSX.Element | null;
}

class IncidentReportController extends React.PureComponent<
  ChildDataProps<Props, IncidentReportQuery, {}>
> {
  render() {
    const data = this.props.data;

    return this.props.children({
      queries: {
        incidentReportQuery: data,
      },
    });
  }
}

const incidentReportQuery = gql`
  query IncidentReportQuery {
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
      creator{
        id
        email
        firstName
        lastName
      }
      comments{
        comment
        id
        creator{
          id
          email
        }
      }
    }
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
  IncidentReportQuery
>(incidentReportQuery)(IncidentReportController)

