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
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route path="dashboard" element={<NavbarOutlet />}>
          <Route index element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route
            path="calendar"
            element={user ? <CalendarPage /> : <Navigate to="/" />}
          />
          <Route path="log" element={user ? <Log /> : <Navigate to="/" />} />
          <Route
            path="settings"
            element={user ? <Settings /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
