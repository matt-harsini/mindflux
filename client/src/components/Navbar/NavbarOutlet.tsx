import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function NavbarOutlet() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
