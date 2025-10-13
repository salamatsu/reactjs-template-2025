import { HomeOutlined } from "@ant-design/icons";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import BasicLayout from "../../components/layout/BasicLayout";
import { ComponentLoader } from "../../components/LoadingFallback";
import { useAdminAuthStore } from "../../store/hotelStore";
import { Auth, UnAuth } from "../ValidateAuth";

// Lazy load page components
const Login = lazy(() => import("../../pages/Admin/Login"));
const Dashboard = lazy(() => import("../../pages/Admin/Dashboard"));

const AdminRoute = () => {
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
  ].map((page) => ({ ...page, route: "/admin" + page.route }));

  // ========== Render Routes ==========
  return (
    <Routes>
      <Route
        element={
          <UnAuth store={useAdminAuthStore} redirect="/admin/dashboard" />
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
      <Route element={<Auth store={useAdminAuthStore} redirect="/admin" />}>
        {/* Main Layout Route */}
        <Route
          element={
            <BasicLayout navigations={navigations} store={useAdminAuthStore} />
          }
        >
          {navigations
            .filter((page) => page.isShow) // Only create routes for visible pages
            .map((page) => {
              const routePath = page.route.replace("/admin/", "");

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

export default AdminRoute;
