import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import AllServices from "../pages/AllServices";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ServiceDetails from "../pages/ServiceDetails";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute"; // Import AdminRoute
import ProviderRoute from "../routes/ProviderRoute"; // Import ProviderRoute
import MyBookings from "../pages/MyBookings";
import AddService from "../pages/AddService";
import MyServices from "../pages/MyServices";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/Profile";
import DashboardLayout from "../components/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import ManageUsers from "../pages/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "services",
        element: <AllServices />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "services/:id",
        loader: ({ params }) =>
          fetch(
            `https://home-hero-server-kappa.vercel.app/services/${params.id}`
          ),
        element: <ServiceDetails />,
      },
    ],
  },
  {
    // ROLE-BASED DASHBOARD PARENT ROUTE
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // Customer Routes (Accessible to all logged in users)
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      // Provider Routes (Guarded)
      {
        path: "add-service",
        element: (
          <ProviderRoute>
            <AddService />
          </ProviderRoute>
        ),
      },
      {
        path: "my-services",
        element: (
          <ProviderRoute>
            <MyServices />
          </ProviderRoute>
        ),
      },
      // Admin Routes (Guarded)
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
