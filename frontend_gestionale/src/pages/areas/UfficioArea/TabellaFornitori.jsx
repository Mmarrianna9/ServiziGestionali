import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, Trash2, Mail, User, Tag, Loader2 } from 'lucide-react';

export default function TabellaFornitori() {
  const [fornitori, setFornitori] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nomeAzienda: '', contattoRiferimento: '', categoriaFornitura: '', email: '' });

  const API_URL = 'http://localhost:8080/api/fornitori';

  const fetchFornitori = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.data) setFornitori(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchFornitori(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, form);
      setForm({ nomeAzienda: '', contattoRiferimento: '', categoriaFornitura: '', email: '' });
      fetchFornitori();
    } catch (err) { console.error("Errore API:", err);
  alert("Si è verificato un errore durante l'operazione.");
} finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
          <Truck size={20} className="text-orange-600" /> Nuovo Fornitore
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input type="text" placeholder="Azienda Fornitrice" required className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            value={form.nomeAzienda} onChange={e => setForm({...form, nomeAzienda: e.target.value})} />
          <input type="text" placeholder="Persona di Riferimento" className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            value={form.contattoRiferimento} onChange={e => setForm({...form, contattoRiferimento: e.target.value})} />
          <input type="text" placeholder="Categoria (es. Hardware)" className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            value={form.categoriaFornitura} onChange={e => setForm({...form, categoriaFornitura: e.target.value})} />
          <input type="email" placeholder="Email Ordini" className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition-all flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin" /> : "Aggiungi"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-slate-600 font-bold text-sm uppercase">Fornitore</th>
              <th className="px-6 py-4 text-slate-600 font-bold text-sm uppercase text-center">Settore</th>
              <th className="px-6 py-4 text-slate-600 font-bold text-sm uppercase text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fornitori.map(f => (
              <tr key={f.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800 uppercase text-xs tracking-wider">{f.nomeAzienda}</div>
                  <div className="text-sm text-slate-600 flex items-center gap-1"><User size={14}/> {f.contattoRiferimento}</div>
                  <div className="text-xs text-slate-400"><Mail size={12} className="inline"/> {f.email}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded-md text-xs font-bold border border-orange-100">
                    <Tag size={12} className="inline mr-1"/> {f.categoriaFornitura}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={async () => { if(window.confirm("Rimuovere fornitore?")) { await axios.delete(`${API_URL}/${f.id}`); fetchFornitori(); }}} className="text-slate-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}