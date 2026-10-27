import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useStore } from "../store";

export default function Login() {
  const { setUser } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", role: "Patient" });

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("Enter your name and a valid email.");
    const account = { name: form.name.trim(), email: form.email.trim(), role: form.role };
    setUser(account);
    toast.success(`Signed in as ${account.role}.`);
    navigate(account.role === "Admin" ? "/dashboard" : "/");
  }

  return <main className="auth-page"><div className="auth-visual"><FaHeartbeat /><span className="eyebrow">WELCOME TO CAREBRIDGE</span><h1>Care that connects us.</h1><p>Manage your hospital journey with a simple, friendly experience.</p></div>
    <form className="auth-card form-stack" onSubmit={submit}><div className="auth-logo"><FaHeartbeat /><h2>Welcome back</h2><p>Enter your details to continue.</p></div>
      <label>Your name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" /></label>
      <label>Email address<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
      <label>Demo role<select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option>Patient</option><option>Doctor</option><option>Admin</option></select></label>
      <button className="button full-button" type="submit"><FaLock /> Continue</button>
      <p className="form-note">Evaluation demo only. This screen does not verify passwords or provide secure authentication.</p>
      <p className="auth-bottom"><Link to="/">← Back to home</Link></p>
    </form>
  </main>;
}
