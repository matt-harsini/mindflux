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
  const { isAuth } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isAuth ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="login"
          element={!isAuth ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="register"
          element={!isAuth ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route path="dashboard" element={<NavbarOutlet />}>
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
