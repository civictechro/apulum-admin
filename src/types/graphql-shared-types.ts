

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IncidentReportCreation
// ====================================================

export interface IncidentReportCreation_createIncidentReport_Error {
  path: string;
  message: string;
}

export interface IncidentReportCreation_createIncidentReport_IncidentReport {
  id: string;
}

export type IncidentReportCreation_createIncidentReport = IncidentReportCreation_createIncidentReport_Error | IncidentReportCreation_createIncidentReport_IncidentReport;

export interface IncidentReportCreation {
  createIncidentReport: IncidentReportCreation_createIncidentReport[] | null;  // Create a brand new incident report. Can be done by either citizens or city representatives
}

export interface IncidentReportCreationVariables {
  input: IncidentReportInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// A broad list of incident report types in the city
export enum IncidentReportType {
  OTHER = "OTHER",
  PARKING = "PARKING",
  TRASH = "TRASH",
}

// We use the same input for both updates and creations of incident reports so the only mandatory field
// is userId. For the rest, it depends on the mutation being performed.
// TODO: Group latitude and longitude into a separate mandatory input. There is no use case for updating
// just the longitude or the latitude.
export interface IncidentReportInput {
  description?: string | null;
  title?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  type?: IncidentReportType | null;
  userId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
