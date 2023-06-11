import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Dashboard,
  CalendarPage,
  Log,
  Settings,
} from "./pages";
import { SidebarOutlet } from "./components";
import { useAuthContext } from "./hooks/useAuthContext";

export default function App() {
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
      </Routes>
    </BrowserRouter>
  );
}
