import { Link } from "react-router-dom";
import { FaUserMd, FaCalendarCheck, FaUsers, FaFileMedical, FaArrowRight, FaShieldAlt, FaClock, FaHeart } from "react-icons/fa";
import DoctorCard from "../components/DoctorCard";
import { useStore } from "../store";

export default function Home() {
  const { doctors, patients, appointments } = useStore();
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow"><FaHeart /> YOUR HEALTH, OUR PRIORITY</span>
          <h1>Smart Healthcare.<br /><span>Better Care.</span></h1>
          <p>CareBridge connects patients, doctors, and hospital services in one simple, convenient platform.</p>
          <div className="hero-actions"><Link className="button" to="/appointments">Book an Appointment <FaArrowRight /></Link><Link className="button button-outline" to="/doctors">Explore Doctors</Link></div>
          <div className="hero-trust"><span><FaShieldAlt /> Patient-first care</span><span><FaClock /> Easy scheduling</span></div>
        </div>
        <div className="hero-visual">
          <img className="hero-image" src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1100&q=85" alt="Healthcare professional in a modern hospital" />
          <div className="floating-card"><div className="floating-icon"><FaCalendarCheck /></div><div><strong>Appointments made easy</strong><p>Care at your convenience</p></div></div>
        </div>
      </section>

      <section className="stats-strip">
        <div><FaUserMd /><strong>{doctors.length}+</strong><span>Doctors</span></div>
        <div><FaUsers /><strong>{patients.length}+</strong><span>Registered patients</span></div>
        <div><FaCalendarCheck /><strong>{appointments.length}+</strong><span>Appointments</span></div>
        <div><FaFileMedical /><strong>24/7</strong><span>Care information</span></div>
      </section>

      <section className="section services-section">
        <div className="section-heading"><span className="eyebrow">WHAT WE OFFER</span><h2>Healthcare, made simpler</h2><p>Everything you need to manage common hospital tasks in one place.</p></div>
        <div className="service-grid">
          <Link to="/doctors" className="service-card"><div className="service-icon"><FaUserMd /></div><h3>Find Doctors</h3><p>Explore doctors by name and specialization.</p><span>Explore doctors <FaArrowRight /></span></Link>
          <Link to="/appointments" className="service-card"><div className="service-icon"><FaCalendarCheck /></div><h3>Book Appointments</h3><p>Request and track your hospital appointments.</p><span>Book now <FaArrowRight /></span></Link>
          <Link to="/patients" className="service-card"><div className="service-icon"><FaUsers /></div><h3>Patient Management</h3><p>Keep patient information organized.</p><span>View patients <FaArrowRight /></span></Link>
          <div className="service-card"><div className="service-icon"><FaFileMedical /></div><h3>Health Records</h3><p>Keep essential care details easy to find.</p><span>Coming soon</span></div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-heading section-heading-row"><div><span className="eyebrow">MEET OUR TEAM</span><h2>Featured doctors</h2><p>Browse our sample doctor directory.</p></div><Link className="text-link" to="/doctors">View all doctors <FaArrowRight /></Link></div>
        <div className="doctor-grid">{doctors.slice(0, 3).map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}</div>
      </section>
      <section className="cta-section"><div><span className="eyebrow">TAKE THE NEXT STEP</span><h2>Your health deserves easy access to care.</h2><p>Choose a doctor and request an appointment today.</p></div><Link className="button button-light" to="/appointments">Book an Appointment <FaArrowRight /></Link></section>
    </>
  );
}
