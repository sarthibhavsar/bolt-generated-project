import { Navigate } from 'react-router-dom';
import Page404 from '../pages/Utility/Page404';
import Home from '../pages/Dashboard/Home';
import Schedules from '../pages/Schedules';
import ScheduleTask from '../pages/Schedules/ScheduleTask';
import ScheduleDetails from '../pages/Schedules/ScheduleDetails';
import Tasks from '../pages/Tasks';
import { OpenOrders, OrderHistory } from '../pages/WorkOrders';
import Machines from '../pages/Dashboard/Configuration/Machines';

const authProtectedRoutes = [
  { path: '/', component: <Home /> },
  { path: '/schedules', component: <Schedules /> },
  { path: '/schedules/task/:id', component: <ScheduleTask /> },
  { path: '/schedules/details/:id', component: <ScheduleDetails /> },
  { path: '/tasks', component: <Tasks /> },
  { path: '/work-orders/open', component: <OpenOrders /> },
  { path: '/work-orders/history', component: <OrderHistory /> },
  { path: '/configuration/machines', component: <Machines /> },
  {
    path: '/',
    exact: true,
    component: <Navigate to={`/`} />,
  },
];

const publicRoutes = [{ path: '*', component: <Page404 /> }];

export { authProtectedRoutes, publicRoutes };
