import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCalendarCheck, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useStore } from "../store";

const blank = { patientName: "", doctorName: "", date: "", time: "10:00", reason: "" };

export default function Appointments() {
  const { appointments, setAppointments, doctors, user } = useStore();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ ...blank, doctorName: params.get("doctor") || "" });
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => appointments.filter(a => `${a.patientName} ${a.doctorName} ${a.status}`.toLowerCase().includes(search.toLowerCase())), [appointments, search]);

  function book(e) {
    e.preventDefault();
    const doctor = doctors.find(d => d.name === form.doctorName);
    if (doctor && doctor.availability !== "Available") return toast.error("This doctor is currently unavailable.");
    if (form.date < new Date().toISOString().slice(0, 10)) return toast.error("Please choose today or a future date.");
    const duplicate = appointments.some(a => a.doctorName === form.doctorName && a.date === form.date && a.time === form.time && a.status !== "Cancelled");
    if (duplicate) return toast.error("That doctor already has an appointment at this time.");
    setAppointments(old => [{ ...form, id: Date.now(), status: "Pending" }, ...old]);
    setForm({ ...blank, doctorName: form.doctorName });
    toast.success("Appointment request submitted!");
  }
  function updateStatus(id, status) {
    setAppointments(old => old.map(a => a.id === id ? { ...a, status } : a));
    toast.success(`Appointment ${status.toLowerCase()}.`);
  }
  function remove(id) {
    if (window.confirm("Delete this appointment?")) {
      setAppointments(old => old.filter(a => a.id !== id));
      toast.success("Appointment deleted.");
    }
  }

  return <main className="page-container">
    <div className="page-title-row"><div><span className="eyebrow">SCHEDULE YOUR VISIT</span><h1>Appointments</h1><p>Request an appointment or track existing bookings.</p></div></div>
    <div className="appointment-layout">
      <form className="panel form-stack" onSubmit={book}><div className="panel-title"><span className="panel-icon"><FaCalendarCheck /></span><div><h2>Book an appointment</h2><p>Fields marked with * are required.</p></div></div>
        <label>Patient name *<input required value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })} placeholder="Enter patient name" /></label>
        <label>Select doctor *<select required value={form.doctorName} onChange={e => setForm({ ...form, doctorName: e.target.value })}><option value="">Choose a doctor</option>{doctors.map(d => <option key={d.id} disabled={d.availability !== "Available"}>{d.name}</option>)}</select></label>
        <div className="form-row"><label>Date *<input type="date" min={new Date().toISOString().slice(0, 10)} required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></label><label>Time *<select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>{["09:00","09:30","10:00","10:30","11:00","11:30","12:00","14:00","14:30","15:00","15:30","16:00"].map(t => <option key={t} value={t}>{t}</option>)}</select></label></div>
        <label>Reason for visit *<textarea required rows="3" maxLength="300" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Briefly describe the reason for your visit" /></label>
        <button className="button full-button" type="submit">Request appointment</button>
        <p className="form-note">Demo only: booking data is stored in this browser, not sent to a hospital.</p>
      </form>
      <section className="panel appointments-panel"><div className="panel-title"><div><h2>Appointment list</h2><p>{appointments.length} total bookings</p></div></div>
        <input className="input-standalone" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search appointments..." />
        <div className="appointment-list">{filtered.map(a => <article className="appointment-item" key={a.id}><div className="date-tile"><strong>{a.date.slice(8,10)}</strong><span>{new Date(`${a.date}T12:00:00`).toLocaleString("en-IN", { month: "short" })}</span></div><div className="appointment-info"><h3>{a.patientName}</h3><p>{a.doctorName}</p><small>{a.date} · {a.time} · {a.reason}</small><div><span className={`status ${a.status === "Confirmed" ? "status-good" : a.status === "Cancelled" ? "status-bad" : "status-pending"}`}>{a.status}</span></div></div>
          <div className="appointment-actions">{user?.role === "Admin" && a.status === "Pending" && <button className="button button-small" onClick={() => updateStatus(a.id, "Confirmed")}>Confirm</button>}{a.status !== "Cancelled" && <button className="icon-button danger-text" title="Cancel appointment" onClick={() => updateStatus(a.id, "Cancelled")}><FaTimes /></button>}{user?.role === "Admin" && <button className="icon-button danger-text" title="Delete appointment" onClick={() => remove(a.id)}><FaTrash /></button>}</div>
        </article>)}
        {!filtered.length && <div className="empty-state"><h3>No appointments found</h3><p>Book one using the form.</p></div>}</div>
      </section>
    </div>
  </main>;
}
