import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<NavbarOutlet />}>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="log" element={<Log />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
