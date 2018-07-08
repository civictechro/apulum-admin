

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CallCenterQuery
// ====================================================

export interface CallCenterQuery_incidentReports {
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

export interface CallCenterQuery_me {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface CallCenterQuery {
  incidentReports: CallCenterQuery_incidentReports[] | null;  // List all incident reports in the system
  me: CallCenterQuery_me | null;
}


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
// GraphQL query operation: IncidentReportQuery
// ====================================================

export interface IncidentReportQuery_incidentReports_creator {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface IncidentReportQuery_incidentReports_comments_creator {
  id: string;
  email: string;
}

export interface IncidentReportQuery_incidentReports_comments {
  comment: string | null;
  id: string;
  creator: IncidentReportQuery_incidentReports_comments_creator;
}

export interface IncidentReportQuery_incidentReports {
  id: string;
  status: IncidentReportStatus | null;
  title: string;
  description: string;
  latitude: number;   // The latitude is stored in the DB with a 1m precision, which should suffice for any city report
  longitude: number;  // The longitude is stored in the DB with a 1m precision, which should suffice for any city report
  type: IncidentReportType | null;
  createdAt: any;
  updatedAt: any;
  creator: IncidentReportQuery_incidentReports_creator;
  comments: (IncidentReportQuery_incidentReports_comments | null)[] | null;
}

export interface IncidentReportQuery_me {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface IncidentReportQuery {
  incidentReports: IncidentReportQuery_incidentReports[] | null;  // List all incident reports in the system
  me: IncidentReportQuery_me | null;
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

//==============================================================
// END Enums and Input Objects
//==============================================================