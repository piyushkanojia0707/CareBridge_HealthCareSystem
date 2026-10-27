import { Link } from "react-router-dom";
import { FaHeartbeat, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div><h3><FaHeartbeat /> CareBridge</h3><p>Smart hospital management for a healthier tomorrow.</p></div>
        <div><h4>Quick Links</h4><Link to="/">Home</Link><Link to="/doctors">Doctors</Link><Link to="/appointments">Appointments</Link></div>
        <div><h4>Contact</h4><p><FaMapMarkerAlt /> Rajpura, Punjab</p><p><FaPhoneAlt /> +91 98765 43210</p><p><FaEnvelope /> support@carebridge.example</p></div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} CareBridge. All rights reserved.</div>
    </footer>
  );
}
