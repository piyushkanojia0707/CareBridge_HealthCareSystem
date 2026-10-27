import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { StoreProvider, useStore } from "./store";

function Layout() {
  const { user } = useStore();
  const location = useLocation();
  const authPage = location.pathname === "/login";
  return <>
    {!authPage && <Navbar />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={user?.role === "Admin" ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    {!authPage && <Footer />}
  </>;
}

export default function App() {
  return <StoreProvider><Layout /></StoreProvider>;
}
