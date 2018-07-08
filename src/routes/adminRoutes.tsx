import { DashboardConnector } from "../modules/dashboard/DashboardConnector";
import { CallCenterConnector } from "../modules/callCenter/CallCenterConnector";
import { IncidentReportConnector } from "../modules/incidentReport/IncidentReportConnector";

export const adminRoutes: any = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    showMenu: true,
    exact: true,
    component: DashboardConnector
  },
  {
    name: 'Dispecerat',
    icon: 'customer-service',
    showMenu: true,
    path: "/dispecerat",
    children: [
      {
        name: 'Hartă incidente',
        icon: 'dot-chart',
        showMenu: true,
        exact: true,
        path: '/dispecerat/harta',
        component: CallCenterConnector,
      },
      {
        name: 'Management incidente',
        icon: 'calendar',
        showMenu: true,
        exact: false,
        path: '/dispecerat/incidente/',
        component: IncidentReportConnector,
      },
      {
        name: 'Management incidente',
        icon: 'calendar',
        showMenu: false,
        exact: true,
        path: '/dispecerat/incidente/:id',
        component: IncidentReportConnector,
      },
    ]
  },
];
