import gql from "graphql-tag";

export const incidentReportCreationMutation = gql`
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
