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
    showMenu: true,
    path: "/dispecerat",
    children: [
      {
        name: 'Hartă',
        icon: 'dot-chart',
        showMenu: true,
        path: '/dispecerat/harta',
        component: CallCenterConnector,
      },
      {
        name: 'Hartă 2',
        icon: 'dot-chart',
        showMenu: true,
        path: '/dispecerat/harta2',
        component: CallCenterConnector,
      }
    ]
  },
];
