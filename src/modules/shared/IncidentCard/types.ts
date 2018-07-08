import { IncidentReportType, IncidentReportStatus } from "../../../types/graphql-types";

export interface IncidentReport {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  type: IncidentReportType;
  status: IncidentReportStatus;
  createdAt?: string;
  updatedAt?: string;
}
