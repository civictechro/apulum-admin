

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardQuery
// ====================================================

export interface DashboardQuery_incidentReports {
  status: IncidentReportStatus | null;
  title: string;
  description: string;
}

export interface DashboardQuery {
  incidentReports: DashboardQuery_incidentReports[] | null;  // List all incident reports in the system
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

//==============================================================
// END Enums and Input Objects
//==============================================================