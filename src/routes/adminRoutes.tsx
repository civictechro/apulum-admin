import { DashboardConnector } from "../modules/dashboard/DashboardConnector";
import { CallCenterConnector } from "../modules/callCenter/CallCenterConnector";

export const adminRoutes = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    showMenu: true,
    component: DashboardConnector
  },
  {
    name: 'Dispecerat',
    icon: 'customer-service',
    path: '/dispecerat',
    showMenu: true,
    component: CallCenterConnector
  },
];
