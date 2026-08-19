import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import VerifyEmail from "./features/auth/pages/VerifyEmail";
import ProtectedRoutes from "./shared/components/ProtectedRoutes";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Layout from "./shared/components/Layout";
import Navbar from "./shared/components/Navbar";
import Leaderboard from "./features/leaderboard/pages/Leaderboard";
import Friends from "./features/friends/pages/Friends";
import Contest from "./features/contest/pages/Contest";
import Profile from "./features/profile/pages/Profile";
import CreateContest from "./features/contest/pages/CreateContest";
import ScrollToTop from "./shared/components/ScrollToTop";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import ResetPassword from "./features/auth/pages/ResetPassword";

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
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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
  {
    path: "/profile/:userId",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Profile />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/contest/create",
    element: (
      <ProtectedRoutes>
        <ScrollToTop />
        <Layout>
          <CreateContest />
        </Layout>
      </ProtectedRoutes>
    ),
  },
]);
