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
import { NavbarOutlet } from "./components";
import { useAuthContext } from "./hooks/useAuthContext";

export default function App() {
  const { token } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!token ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="login"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="register"
          element={!token ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route path="dashboard" element={<NavbarOutlet />}>
          <Route index element={token ? <Dashboard /> : <Navigate to="/" />} />
          <Route
            path="calendar"
            element={token ? <CalendarPage /> : <Navigate to="/" />}
          />
          <Route path="log" element={token ? <Log /> : <Navigate to="/" />} />
          <Route
            path="settings"
            element={token ? <Settings /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
