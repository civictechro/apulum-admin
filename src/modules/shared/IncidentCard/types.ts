import { IncidentReportType, IncidentReportStatus } from "../../../types/graphql-types";

export interface IncidentReport {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  type: IncidentReportType;
  status: IncidentReportStatus;
}
