import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import LoadingFallback from "../components/LoadingFallback";

// Lazy load route components for code splitting
const LandingPage = lazy(() => import("../pages/LandingPage"));
const AdminRoute = lazy(() => import("./pageRoutes/AdminRoute"));
const ReceptionistRoute = lazy(() => import("./pageRoutes/ReceptionistRoute"));
const SuperAdminRoute = lazy(() => import("./pageRoutes/SuperAdminRoute"));

const RootRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <LandingPage />
        </Suspense>
      ),
    },
    {
      path: "/superadmin/*",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <SuperAdminRoute />
        </Suspense>
      ),
    },
    {
      path: "/admin/*",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <AdminRoute />
        </Suspense>
      ),
    },
    {
      path: "/receptionist/*",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <ReceptionistRoute />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RootRoutes;
