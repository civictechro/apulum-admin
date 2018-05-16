import ProfileView from "../views/ProfileView";
import EmptyView from "../views/EmptyView";
import TasksView from "../views/TasksView";

export const adminRoutes = [
  {
    name: 'Tasks',
    icon: 'layout',
    path: '/admin/tasks',
    showMenu: true,
    view: TasksView,
  },
  {
    name: 'Panou de control',
    icon: 'dashboard',
    path: '/admin/dashboard',
    showMenu: true,
    view: EmptyView,
  },
  {
    name: 'Task',
    icon: 'layout',
    path: '/admin/tasks/:id',
    view: EmptyView,
  },
  {
    name: 'Profil personal',
    icon: 'user',
    path: '/admin/me',
    showMenu: true,
    view: ProfileView,
  },
];
