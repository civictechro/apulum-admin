/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface meQuery {
  me:  {
    id: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
  } | null,
};

export interface loginMutationVariables {
  email: string,
  password: string,
};

export interface loginMutation {
  login:  Array< {
    path: string,
    message: string,
  } > | null,
};

export interface meLoginQuery {
  me:  {
    id: string,
    email: string,
  } | null,
};

export interface meOnProfileQuery {
  me:  {
    id: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
  } | null,
};

export interface updateUserMutationMutationVariables {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
};

export interface updateUserMutationMutation {
  updateUser:  Array<( {
      path: string,
      message: string,
    } | {
      id: string,
      email: string,
      firstName: string | null,
      lastName: string | null,
    }
  ) > | null,
};

export interface tasksQuery {
  tasks:  Array< {
    id: string,
    title: string,
    description: string,
    creator:  {
      id: string,
      email: string,
      firstName: string | null,
      lastName: string | null,
    },
    asignee:  {
      id: string,
      email: string,
      firstName: string | null,
      lastName: string | null,
    } | null,
  } > | null,
};

export interface createTaskMutationMutationVariables {
  userId: string,
  title: string,
  description: string,
};

export interface createTaskMutationMutation {
  createTask:  Array< {
    path: string,
    message: string,
  } > | null,
};

export interface meOnTasksQuery {
  me:  {
    id: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
  } | null,
};
