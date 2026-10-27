import { FaCalendarCheck, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  return (
    <article className="doctor-card">
      <img src={doctor.image || "https://placehold.co/600x400/e8f4f7/176d85?text=Doctor"} alt={doctor.name} />
      <div className="doctor-card-body">
        <span className={`status ${doctor.availability === "Available" ? "status-good" : "status-muted"}`}>{doctor.availability}</span>
        <h3>{doctor.name}</h3>
        <p className="speciality"><FaUserMd /> {doctor.specialization}</p>
        <p>{doctor.experience} years of experience</p>
        <Link className="button full-button" to={`/appointments?doctor=${encodeURIComponent(doctor.name)}`}><FaCalendarCheck /> Book appointment</Link>
      </div>
    </article>
  );
}
