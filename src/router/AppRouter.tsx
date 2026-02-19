import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Appointments } from "../pages/Appointments";
import { Navbar } from "../components/Navbar";

function RouterContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
      {showNavbar && <Navbar />}
    </>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
}
