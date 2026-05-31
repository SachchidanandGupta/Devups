import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ProtectedRoutes from "./shared/components/ProtectedRoutes";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Layout from "./shared/components/Layout";
import Navbar from "./shared/components/Navbar";
import Leaderboard from "./features/leaderboard/pages/Leaderboard";
import Friends from "./features/friends/pages/Friends";
import Contest from "./features/contest/pages/Contest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/leaderboard",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Leaderboard />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/friends",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Friends />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/contest",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Contest />
        </Layout>
      </ProtectedRoutes>
    ),
  },
]);
