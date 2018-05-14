// import DashboardView from "../views/DashboardView";
import EmptyView from "../views/EmptyView";

export const adminRoutes = [
  {
    name: 'Tasks',
    icon: 'layout',
    path: '/admin/tasks',
    showMenu: true,
    view: EmptyView,
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
    view: EmptyView,
  },
];
