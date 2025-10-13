import { HomeOutlined, KeyOutlined } from "@ant-design/icons";
import { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router";
import BasicLayout from "../../components/layout/BasicLayout";
import { ComponentLoader } from "../../components/LoadingFallback";
import { useReceptionistAuthStore } from "../../store/hotelStore";
import { Auth, UnAuth } from "../ValidateAuth";

// Lazy load page components
const Login = lazy(() => import("../../pages/Receptionist/Login"));
const Dashboard = lazy(() => import("../../pages/Receptionist/Dashboard"));

// Placeholder components for missing pages (to be implemented)
const RoomBooking = () => <div>Room Booking - Coming Soon</div>;
const Bookings = () => <div>Bookings - Coming Soon</div>;

const ReceptionistRoute = () => {
  // ========== Navigation Configuration ==========
  const navigations = [
    {
      route: "/dashboard",
      name: "Dashboard",
      label: "Dashboard",
      icon: <HomeOutlined className="h-5 w-5" />,
      component: (
        <Suspense fallback={<ComponentLoader />}>
          <Dashboard />
        </Suspense>
      ),
      isFilter: true,
      isShow: true,
    },
    {
      route: "/rooms",
      name: "Rooms",
      label: "Rooms",
      icon: <KeyOutlined className="h-5 w-5" />,
      component: (
        <Suspense fallback={<ComponentLoader />}>
          <RoomBooking />
        </Suspense>
      ),
      isFilter: true,
      isShow: true,
    },
    {
      route: "/bookings",
      name: "Bookings",
      label: "Bookings",
      icon: <KeyOutlined className="h-5 w-5" />,
      component: (
        <Suspense fallback={<ComponentLoader />}>
          <Bookings />
        </Suspense>
      ),
      isFilter: true,
      isShow: true,
    },
  ].map((page) => ({ ...page, route: "/receptionist" + page.route }));

  return (
    <Routes>
      <Route
        element={
          <UnAuth
            store={useReceptionistAuthStore}
            redirect="/receptionist/dashboard"
          />
        }
      >
        <Route
          path="/"
          index
          element={
            <Suspense fallback={<ComponentLoader />}>
              <Login />
            </Suspense>
          }
        />
      </Route>

      <Route
        element={
          <Auth store={useReceptionistAuthStore} redirect="/receptionist" />
        }
      >
        <Route
          element={
            <BasicLayout
              navigations={navigations}
              store={useReceptionistAuthStore}
            />
          }
        >
          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {navigations
            .filter((page) => page.isShow) // Only create routes for visible pages
            .map((page) => {
              // Use 'route' instead of 'link' and fix the path extraction
              const routePath = page.route.replace("/receptionist/", "");

              return (
                <Route
                  key={page.route}
                  path={routePath}
                  element={page.component}
                />
              );
            })}

          {/* Fallback Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ReceptionistRoute;
