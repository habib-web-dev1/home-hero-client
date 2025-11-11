import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import AllServices from "../pages/AllServices";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ServiceDetails from "../pages/ServiceDetails";
import PrivateRoute from "../routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/services",
        Component: AllServices,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/services/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/services/${params.id}`),
        element: (
          <PrivateRoute>
            <ServiceDetails></ServiceDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
