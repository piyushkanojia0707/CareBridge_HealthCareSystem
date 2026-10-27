import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHeartbeat, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useStore } from "../store";

export default function Navbar() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  function logout() {
    setUser(null);
    toast.success("You have been logged out.");
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/"><FaHeartbeat /> CareBridge</Link>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/doctors">Doctors</NavLink>
        <NavLink to="/patients">Patients</NavLink>
        <NavLink to="/appointments">Appointments</NavLink>
        {user?.role === "Admin" && <NavLink to="/dashboard">Dashboard</NavLink>}
      </nav>
      <div className="nav-actions">
        {user ? (
          <>
            <span className="welcome-user">Hi, {user.name}</span>
            <button className="icon-button" onClick={logout} title="Log out"><FaSignOutAlt /></button>
          </>
        ) : <Link className="button button-small" to="/login">Login</Link>}
      </div>
    </header>
  );
}
