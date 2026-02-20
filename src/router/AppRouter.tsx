import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Search } from "../pages/Search";
import { Appointments } from "../pages/Appointments";
import { Profile } from "../pages/Profile";
import { Navbar } from "../components/Navbar";

function RouterContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/asa";

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
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
