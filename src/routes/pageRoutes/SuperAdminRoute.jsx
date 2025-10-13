import { HomeOutlined } from "@ant-design/icons";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import BasicLayout from "../../components/layout/BasicLayout";
import { ComponentLoader } from "../../components/LoadingFallback";
import { useSuperAdminAuthStore } from "../../store/hotelStore";
import { Auth, UnAuth } from "../ValidateAuth";

// Lazy load page components
const Login = lazy(() => import("../../pages/SuperAdmin/Login"));
const Dashboard = lazy(() => import("../../pages/SuperAdmin/Dashboard"));

const SuperAdminRoute = () => {
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
  ].map((page) => ({ ...page, route: "/superadmin" + page.route }));

  // ========== Render Routes ==========
  return (
    <Routes>
      <Route
        element={
          <UnAuth
            store={useSuperAdminAuthStore}
            redirect="/superadmin/dashboard"
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

      {/* Protected Route Wrapper */}
      <Route
        element={<Auth store={useSuperAdminAuthStore} redirect="/superadmin" />}
      >
        <Route
          element={
            <BasicLayout
              navigations={navigations}
              store={useSuperAdminAuthStore}
            />
          }
        >
          {/* Main Layout Route */}
          {navigations
            .filter((page) => page.isShow) // Only create routes for visible pages
            .map((page) => {
              // Use 'route' instead of 'link' and fix the path extraction
              const routePath = page.route.replace("/superadmin/", "");

              return (
                <Route
                  key={page.route}
                  path={routePath}
                  element={page.component}
                />
              );
            })}
        </Route>
        {/* Fallback Route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default SuperAdminRoute;
