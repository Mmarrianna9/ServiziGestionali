import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Trash2, Mail, Shield, BadgeEuro, Loader2 } from 'lucide-react';

export default function TabellaDipendenti() {
  const [dipendenti, setDipendenti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: '', cognome: '', email: '', ruolo: 'USER', stipendio: ''
  });

  const API_URL = 'http://localhost:8080/api/dipendenti';

  const fetchDipendenti = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.data) setDipendenti(res.data.data);
    } catch (err) {
      console.error("Errore caricamento dipendenti", err);
    }
  };

  useEffect(() => { fetchDipendenti(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, form);
      setForm({ nome: '', cognome: '', email: '', ruolo: 'USER', stipendio: '' });
      fetchDipendenti();
    } catch (err) {
      alert("Errore nel salvataggio: " + err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Licenziare questo dipendente?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchDipendenti();
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Aggiunta */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
          <UserPlus size={20} className="text-purple-600" /> Registra Nuovo Collaboratore
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <input type="text" placeholder="Nome" required className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
          
          <input type="text" placeholder="Cognome" required className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            value={form.cognome} onChange={e => setForm({...form, cognome: e.target.value})} />
          
          <input type="email" placeholder="Email aziendale" required className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          
          <select className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
            value={form.ruolo} onChange={e => setForm({...form, ruolo: e.target.value})}>
            <option value="USER">USER (Magazziniere)</option>
            <option value="ADMIN">ADMIN (Direzione)</option>
          </select>

          <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition-all flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin" /> : "Assumi"}
          </button>
        </form>
      </div>

      {/* Tabella Lista */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-slate-600 font-bold text-sm uppercase">Dipendente</th>
              <th className="px-6 py-4 text-slate-600 font-bold text-sm uppercase text-center">Ruolo</th>
              <th className="px-6 py-4 text-slate-600 font-bold text-sm uppercase text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dipendenti.map(d => (
              <tr key={d.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                      {d.nome[0]}{d.cognome[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{d.nome} {d.cognome}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1"><Mail size={12}/> {d.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                    d.ruolo === 'ADMIN' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                  }`}>
                    <Shield size={12}/> {d.ruolo}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(d.id)} className="text-slate-400 hover:text-red-600 p-2 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}