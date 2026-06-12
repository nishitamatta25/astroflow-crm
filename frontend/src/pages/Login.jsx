import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "admin@astrocrm.com", password: "Admin@123" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f7fb] p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-md border border-line bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold text-brand">Astrologer CRM</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Sign in</h1>
        </div>
        {error && <div className="mb-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}
        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Email</span>
          <div className="flex items-center gap-2 rounded-md border border-line px-3 py-2">
            <Mail size={16} className="text-slate-400" />
            <input className="w-full outline-none" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </label>
        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Password</span>
          <div className="flex items-center gap-2 rounded-md border border-line px-3 py-2">
            <Lock size={16} className="text-slate-400" />
            <input type="password" className="w-full outline-none" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
        </label>
        <button disabled={loading} className="w-full rounded-md bg-brand px-4 py-2 font-semibold text-white hover:bg-blue-700">
          {loading ? "Signing in..." : "Login"}
        </button>
        <div className="mt-4 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
          Admin: admin@astrocrm.com / Admin@123<br />
          Astrologer: rahul@astrocrm.com / Astro@123
        </div>
      </form>
    </div>
  );
}
