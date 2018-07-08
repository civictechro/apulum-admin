

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardQuery
// ====================================================

export interface DashboardQuery_incidentReports {
  id: string;
  status: IncidentReportStatus | null;
  title: string;
  description: string;
  latitude: number;   // The latitude is stored in the DB with a 1m precision, which should suffice for any city report
  longitude: number;  // The longitude is stored in the DB with a 1m precision, which should suffice for any city report
  type: IncidentReportType | null;
  createdAt: any;
  updatedAt: any;
}

export interface DashboardQuery_tasks {
  title: string;
}

export interface DashboardQuery_users {
  id: string;
}

export interface DashboardQuery_me {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface DashboardQuery {
  incidentReports: DashboardQuery_incidentReports[] | null;  // List all incident reports in the system
  tasks: DashboardQuery_tasks[] | null;
  users: DashboardQuery_users[] | null;
  me: DashboardQuery_me | null;
}


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

// ====================================================
// GraphQL mutation operation: ForgotPasswordMutation
// ====================================================

export interface ForgotPasswordMutation {
  sendForgotPasswordEmail: boolean | null;
}

export interface ForgotPasswordMutationVariables {
  email: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  path: string;
  message: string;
}

export interface LoginMutation {
  login: LoginMutation_login[] | null;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation {
  logout: boolean | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation_register {
  path: string;
  message: string;
}

export interface RegisterMutation {
  register: RegisterMutation_register[] | null;
}

export interface RegisterMutationVariables {
  email: string;
  password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_me {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface UserQuery {
  me: UserQuery_me | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// The status of the report, as marked by the city representatives
export enum IncidentReportStatus {
  DENIED = "DENIED",
  NEW = "NEW",
  SOLVED = "SOLVED",
  TRIAGED = "TRIAGED",
}

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
