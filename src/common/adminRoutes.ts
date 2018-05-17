import ProfileView from "../views/ProfileView";
// import EmptyView from "../views/EmptyView";
import TasksView from "../views/TasksView";
import TaskView from "../views/TaskView";
import DashboardView from "../views/DashboardView";

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
    view: DashboardView,
  },
  {
    name: 'Task',
    icon: 'layout',
    path: '/admin/tasks/:id',
    view: TaskView,
  },
  {
    name: 'Profil personal',
    icon: 'user',
    path: '/admin/me',
    showMenu: true,
    view: ProfileView,
  },
];
