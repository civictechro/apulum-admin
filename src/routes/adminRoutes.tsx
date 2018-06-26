import { DashboardConnector } from "../modules/dashboard/DashboardConnector";

export const adminRoutes = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    showMenu: true,
    component: DashboardConnector
  },
];
