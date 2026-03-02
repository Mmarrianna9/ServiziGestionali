import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Trash2, Mail, Phone, Hash, Loader2 } from 'lucide-react';

export default function TabellaClienti() {
  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nome: '', partitaIva: '', email: '', telefono: '' });

  const API_URL = 'http://localhost:8080/api/clienti';

  const fetchClienti = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.data) setClienti(res.data.data);
    } catch (err) { console.error("Errore caricamento clienti", err); }
  };

  useEffect(() => { fetchClienti(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, form);
      setForm({ nome: '', partitaIva: '', email: '', telefono: '' });
      fetchClienti();
    } catch (error) { 
  console.error("Dettagli errore:", error); // <-- Ora la variabile è "usata"!
  alert("Errore durante l'operazione"); 
}  finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
          <UserPlus size={20} className="text-blue-600" /> Nuovo Cliente
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input type="text" placeholder="Nome/Ragione Sociale" required className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
          <input type="text" placeholder="P.IVA / CF" required className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={form.partitaIva} onChange={e => setForm({...form, partitaIva: e.target.value})} />
          <input type="email" placeholder="Email" className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input type="text" placeholder="Telefono" className="p-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin" /> : "Registra"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-slate-600 font-bold text-sm uppercase">Cliente</th>
              <th className="px-6 py-4 text-slate-600 font-bold text-sm uppercase">Contatti</th>
              <th className="px-6 py-4 text-slate-600 font-bold text-sm uppercase text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clienti.map(c => (
              <tr key={c.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{c.nome}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1"><Hash size={12}/> {c.partitaIva}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600 flex items-center gap-2"><Mail size={14}/> {c.email}</div>
                  <div className="text-sm text-slate-600 flex items-center gap-2"><Phone size={14}/> {c.telefono}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={async () => { if(window.confirm("Eliminare?")) { await axios.delete(`${API_URL}/${c.id}`); fetchClienti(); }}} className="text-slate-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}