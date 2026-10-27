import { useMemo, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import { useStore } from "../store";

const blank = { name: "", age: "", gender: "Female", phone: "", email: "" };

export default function Patients() {
  const { patients, setPatients, user } = useStore();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(blank);
  const filtered = useMemo(() => patients.filter(p => `${p.name} ${p.email} ${p.phone}`.toLowerCase().includes(search.toLowerCase())), [patients, search]);

  function openAdd() { setEditId(null); setForm(blank); setShowForm(true); }
  function openEdit(p) { setEditId(p.id); setForm({ ...p }); setShowForm(true); }
  function save(e) {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phone)) return toast.error("Enter a valid 10-digit phone number.");
    if (editId) {
      setPatients(old => old.map(p => p.id === editId ? { ...form, id: editId, age: Number(form.age) } : p));
      toast.success("Patient updated.");
    } else {
      setPatients(old => [...old, { ...form, id: Date.now(), age: Number(form.age) }]);
      toast.success("Patient registered.");
    }
    setShowForm(false);
  }
  function remove(id) {
    if (window.confirm("Delete this patient record?")) {
      setPatients(old => old.filter(p => p.id !== id));
      toast.success("Patient removed.");
    }
  }

  return <main className="page-container">
    <div className="page-title-row"><div><span className="eyebrow">PATIENT DIRECTORY</span><h1>Patient management</h1><p>Register and manage patient contact details.</p></div>{user?.role === "Admin" && <button className="button" onClick={openAdd}><FaPlus /> Register patient</button>}</div>
    <label className="search-box patient-search"><FaSearch /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients by name, email or phone..." /></label>
    {showForm && <div className="modal-backdrop"><form className="modal form-stack" onSubmit={save}><div className="modal-heading"><h2>{editId ? "Edit patient" : "Register patient"}</h2><button type="button" className="icon-button" onClick={() => setShowForm(false)}><FaTimes /></button></div>
      <label>Full name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
      <div className="form-row"><label>Age<input type="number" min="0" max="120" required value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} /></label><label>Gender<select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select></label></div>
      <label>Phone (10 digits)<input required inputMode="numeric" maxLength="10" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })} /></label>
      <label>Email<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
      <button className="button" type="submit">Save patient</button>
    </form></div>}
    {user?.role !== "Admin" && <div className="admin-hint">For this demo, sign in as Admin to add, edit, or delete patient records.</div>}
    <div className="table-wrap"><table><thead><tr><th>Patient</th><th>Age</th><th>Gender</th><th>Phone</th><th>Email</th>{user?.role === "Admin" && <th>Actions</th>}</tr></thead><tbody>
      {filtered.map(p => <tr key={p.id}><td><span className="table-person"><span className="avatar">{p.name.charAt(0)}</span><strong>{p.name}</strong></span></td><td>{p.age}</td><td>{p.gender || "—"}</td><td>{p.phone}</td><td>{p.email}</td>{user?.role === "Admin" && <td><div className="table-actions"><button className="icon-button" onClick={() => openEdit(p)} title="Edit"><FaEdit /></button><button className="icon-button danger-text" onClick={() => remove(p.id)} title="Delete"><FaTrash /></button></div></td>}</tr>)}
    </tbody></table>{!filtered.length && <div className="empty-state"><FaUsers /><h3>No patients found</h3><p>Try another search or register a patient.</p></div>}</div>
  </main>;
}
