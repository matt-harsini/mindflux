import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Forgot, Home, Login, Register, Reset } from "./pages";
import { SidebarOutlet } from "./components";
import { useAuthContext } from "./hooks/useAuthContext";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";

export default function App() {
  const CalendarPage = lazy(() => import("./pages/CalendarPage"));
  const Settings = lazy(() => import("./pages/Settings"));
  const Log = lazy(() => import("./pages/Log"));

  const { isAuth } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="login"
          element={isAuth ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="register"
          element={isAuth ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="forgot"
          element={isAuth ? <Navigate to="/dashboard" /> : <Forgot />}
        />
        <Route
          path="/user"
          element={isAuth ? <Navigate to="/dashboard" /> : <Reset />}
        />
        <Route
          path="/verify-email"
          element={isAuth ? <Navigate to="/dashboard" /> : <VerifyEmail />}
        />
        <Route
          path="dashboard"
          element={isAuth ? <SidebarOutlet /> : <Navigate to="/" />}
        >
          <Route index element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
          <Route
            path="calendar"
            element={isAuth ? <CalendarPage /> : <Navigate to="/" />}
          />
          <Route path="log" element={isAuth ? <Log /> : <Navigate to="/" />} />
          <Route
            path="settings"
            element={isAuth ? <Settings /> : <Navigate to="/" />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
