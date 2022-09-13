import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './constants/app.constants';
import './App.css';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import ClientOrder from './components/client/ClientOrder/ClientOrder';
import ClientCurrentOrder from './components/client/ClientCurrentOrder/ClientCurrentOrder';
import PageWrapper from './shared/components/PageWrapper/PageWrapper';
import PrivateRoute from './shared/components/Router/components/PrivateRoute';
import DriverStartScreen from './components/driver/DriverStartScreen/DriverStartScreen';
import { USER_ROLES } from './constants/user-roles.constants';
import DriverOrders from './components/driver/DriverOrders/DriverOrders';
import HomeRoutes from './shared/components/Router/components/HomeRoutes/HomeRoutes';
import NotFoundPage from './shared/components/NotFoundPage/NotFoundPage';
import RootNotifications from './components/RootNotifications/RootNotifications';
import ActiveTripRoutes from './shared/components/Router/components/ActiveTripRoutes/ActiveTripRoutes';
import ActiveOrderGuard from './guards/ActiveOrderGuard';
import UploadPhotoGuard from './guards/UploadPhotoGuard';
import ActiveTripGuard from './guards/ActiveTripGuard';
import OrdersHistoryRoutes from './shared/components/Router/components/OrdersHistoryRoutes/OrdersHistoryRoutes';
import AdminUsersDrivers from './components/admin/AdminUsers/components/AdminUsersDrivers/AdminUsersDrivers';
import AdminUsersClients from './components/admin/AdminUsers/components/AdminUsersClients/AdminUsersClients';
import AdminReports from './components/admin/AdminReports/AdminReports';

console.log('Preview works134567');

function App() {
  return (
    <div>
      <RootNotifications />
      <PageWrapper>
        <Routes>
          <Route
            path={PRIVATE_ROUTES.HOME}
            element={
              <PrivateRoute roles={[USER_ROLES.CLIENT, USER_ROLES.ADMIN, USER_ROLES.DRIVER]}>
                <HomeRoutes />
              </PrivateRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.ORDER}
            element={
              <PrivateRoute roles={[USER_ROLES.CLIENT]}>
                <ActiveOrderGuard>
                  <ActiveTripGuard>
                    <ClientOrder />
                  </ActiveTripGuard>
                </ActiveOrderGuard>
              </PrivateRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.CURRENT_ORDER}
            element={
              <PrivateRoute roles={[USER_ROLES.CLIENT]}>
                <ClientCurrentOrder />
              </PrivateRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.DRIVER_START}
            element={
              <PrivateRoute roles={[USER_ROLES.DRIVER]}>
                <DriverStartScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.DRIVER_ORDERS}
            element={
              <PrivateRoute roles={[USER_ROLES.DRIVER]}>
                <UploadPhotoGuard>
                  <ActiveTripGuard>
                    <DriverOrders />
                  </ActiveTripGuard>
                </UploadPhotoGuard>
              </PrivateRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.TRIP}
            element={
              <PrivateRoute roles={[USER_ROLES.DRIVER, USER_ROLES.CLIENT]}>
                <ActiveTripRoutes />
              </PrivateRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.ORDERS_HISTORY}
            element={
              <PrivateRoute roles={[USER_ROLES.DRIVER, USER_ROLES.CLIENT]}>
                <OrdersHistoryRoutes />
              </PrivateRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.REPORTS}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <AdminReports />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to={PUBLIC_ROUTES.NOT_FOUND_PAGE} replace />} />
          <Route path={PUBLIC_ROUTES.NOT_FOUND_PAGE} element={<NotFoundPage />} />
          <Route path={PUBLIC_ROUTES.REGISTER} element={<SignUpForm />} />
          <Route path={PUBLIC_ROUTES.LOGIN} element={<SignInForm />} />
          <Route
            path={PRIVATE_ROUTES.USERS_CLIENTS}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <AdminUsersClients />
              </PrivateRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.USERS_DRIVERS}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <AdminUsersDrivers />
              </PrivateRoute>
            }
          />
        </Routes>
      </PageWrapper>
    </div>
  );
}

export default App;
