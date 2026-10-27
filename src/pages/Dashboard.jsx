import { Link } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarCheck, FaHourglassHalf, FaArrowRight } from "react-icons/fa";
import StatCard from "../components/StatCard";
import { useStore } from "../store";

export default function Dashboard() {
  const { doctors, patients, appointments } = useStore();
  const pending = appointments.filter(a => a.status === "Pending").length;
  return <main className="page-container">
    <div className="page-title-row"><div><span className="eyebrow">ADMINISTRATION</span><h1>Dashboard overview</h1><p>Here's a snapshot of the CareBridge demo records.</p></div></div>
    <div className="dashboard-stats">
      <StatCard icon={<FaUserMd />} label="Total doctors" value={doctors.length} note="In directory" />
      <StatCard icon={<FaUsers />} label="Total patients" value={patients.length} note="Registered records" />
      <StatCard icon={<FaCalendarCheck />} label="Appointments" value={appointments.length} note="All statuses" />
      <StatCard icon={<FaHourglassHalf />} label="Pending" value={pending} note="Awaiting review" />
    </div>
    <section className="panel dashboard-table"><div className="panel-title"><div><h2>Recent appointments</h2><p>Latest requests in this browser.</p></div><Link className="text-link" to="/appointments">Manage appointments <FaArrowRight /></Link></div>
      <div className="table-wrap"><table><thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr></thead><tbody>{[...appointments].sort((a,b) => b.id-a.id).slice(0,8).map(a => <tr key={a.id}><td>{a.patientName}</td><td>{a.doctorName}</td><td>{a.date}</td><td>{a.time}</td><td><span className={`status ${a.status === "Confirmed" ? "status-good" : a.status === "Cancelled" ? "status-bad" : "status-pending"}`}>{a.status}</span></td></tr>)}</tbody></table></div>
    </section>
    <div className="quick-links"><Link to="/doctors"><FaUserMd /> Manage doctors <FaArrowRight /></Link><Link to="/patients"><FaUsers /> Manage patients <FaArrowRight /></Link><Link to="/appointments"><FaCalendarCheck /> Manage appointments <FaArrowRight /></Link></div>
    <p className="warning-note">Evaluation note: these are browser-local demo records. Connect the backend and MySQL before using real patient information.</p>
  </main>;
}
