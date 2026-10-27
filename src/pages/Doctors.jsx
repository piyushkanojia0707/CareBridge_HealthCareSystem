import { useMemo, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import DoctorCard from "../components/DoctorCard";
import { useStore } from "../store";

const emptyDoctor = { name: "", specialization: "", experience: 1, availability: "Available", image: "" };

export default function Doctors() {
  const { doctors, setDoctors, user } = useStore();
  const [search, setSearch] = useState("");
  const [speciality, setSpeciality] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyDoctor);
  const specialities = ["All", ...new Set(doctors.map(d => d.specialization))];
  const filtered = useMemo(() => doctors.filter(d =>
    `${d.name} ${d.specialization}`.toLowerCase().includes(search.toLowerCase()) &&
    (speciality === "All" || d.specialization === speciality)
  ), [doctors, search, speciality]);

  function openAdd() { setEditingId(null); setForm(emptyDoctor); setShowForm(true); }
  function openEdit(doctor) { setEditingId(doctor.id); setForm({ ...doctor }); setShowForm(true); }
  function saveDoctor(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.specialization.trim()) return toast.error("Name and specialization are required.");
    if (editingId) {
      setDoctors(old => old.map(d => d.id === editingId ? { ...form, id: editingId, experience: Number(form.experience) } : d));
      toast.success("Doctor updated.");
    } else {
      setDoctors(old => [...old, { ...form, id: Date.now(), experience: Number(form.experience) }]);
      toast.success("Doctor added.");
    }
    setShowForm(false);
  }
  function deleteDoctor(id) {
    if (window.confirm("Delete this doctor?")) {
      setDoctors(old => old.filter(d => d.id !== id));
      toast.success("Doctor deleted.");
    }
  }

  return <main className="page-container">
    <div className="page-title-row"><div><span className="eyebrow">OUR MEDICAL TEAM</span><h1>Find a doctor</h1><p>Explore specialists and choose the right care for you.</p></div>{user?.role === "Admin" && <button className="button" onClick={openAdd}><FaPlus /> Add doctor</button>}</div>
    <div className="filter-bar"><label className="search-box"><FaSearch /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or specialization..." /></label><select value={speciality} onChange={e => setSpeciality(e.target.value)} aria-label="Filter by specialization">{specialities.map(s => <option key={s}>{s}</option>)}</select></div>
    {showForm && <div className="modal-backdrop"><form className="modal form-stack" onSubmit={saveDoctor}><div className="modal-heading"><h2>{editingId ? "Edit doctor" : "Add doctor"}</h2><button type="button" className="icon-button" onClick={() => setShowForm(false)}><FaTimes /></button></div>
      <label>Full name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. First Last" /></label>
      <label>Specialization<input required value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} placeholder="Cardiologist" /></label>
      <label>Years of experience<input type="number" min="0" max="70" required value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} /></label>
      <label>Availability<select value={form.availability} onChange={e => setForm({ ...form, availability: e.target.value })}><option>Available</option><option>Unavailable</option></select></label>
      <label>Photo URL (optional)<input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></label>
      <button className="button" type="submit">Save doctor</button>
    </form></div>}
    {user?.role === "Admin" && <div className="admin-hint">Admin mode: you can add, edit, and delete doctor records. Demo data is stored in this browser.</div>}
    {filtered.length ? <div className="doctor-grid">{filtered.map(doctor => <div className="doctor-management" key={doctor.id}><DoctorCard doctor={doctor} />{user?.role === "Admin" && <div className="card-actions"><button className="button button-small button-secondary" onClick={() => openEdit(doctor)}><FaEdit /> Edit</button><button className="button button-small button-danger" onClick={() => deleteDoctor(doctor.id)}><FaTrash /> Delete</button></div>}</div>)}</div> : <div className="empty-state"><h3>No doctors found</h3><p>Try another search term or specialization.</p></div>}
  </main>;
}
