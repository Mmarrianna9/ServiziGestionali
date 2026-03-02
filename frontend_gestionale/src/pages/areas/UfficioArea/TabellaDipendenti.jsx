import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Trash2, Mail, Shield, Loader2 } from 'lucide-react';

export default function TabellaDipendenti() {
  const [dipendenti, setDipendenti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: '', cognome: '', email: '', ruolo: 'USER', stipendio: ''
  });

  const API_URL = 'http://localhost:8080/api/dipendenti';

  // 1. Caricamento dati (Legge res.data.data dal tuo ApiResponse Java)
  const fetchDipendenti = async () => {
    try {
      const res = await axios.get(API_URL);
      // Estraiamo i dati dall'oggetto ApiResponse
      const lista = res.data.data || res.data;
      if (Array.isArray(lista)) {
        setDipendenti(lista);
      }
    } catch (err) {
      console.error("Errore nel caricamento:", err);
    }
  };

  useEffect(() => {
    fetchDipendenti();
  }, []);

  // 2. Registrazione (Con conversione numerica dello stipendio)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Spring Boot vuole lo stipendio come numero (Double), non come testo
    const payload = {
      ...form,
      stipendio: parseFloat(form.stipendio) || 0
    };

    try {
      await axios.post(API_URL, payload);
      setForm({ nome: '', cognome: '', email: '', ruolo: 'USER', stipendio: '' });
      fetchDipendenti(); // Ricarica la lista per vedere il nuovo arrivato
      alert("Collaboratore registrato con successo!");
    } catch (err) {
      console.error("Errore salvataggio:", err.response?.data);
      alert("Errore: " + (err.response?.data?.message || "Server non raggiungibile"));
    } finally {
      setLoading(false);
    }
  };

  // 3. Eliminazione
  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo profilo?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchDipendenti();
      } catch (err) {
        console.error("Errore eliminazione:", err);
        alert("Impossibile eliminare il dipendente.");
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Form di Registrazione */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <UserPlus size={20} className="text-purple-600" /> 
          Registra Nuovo Collaboratore
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <input 
            type="text" placeholder="Nome" required 
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} 
          />
          <input 
            type="text" placeholder="Cognome" required 
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={form.cognome} onChange={e => setForm({...form, cognome: e.target.value})} 
          />
          <input 
            type="email" placeholder="Email" required 
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})} 
          />
          <input 
            type="number" placeholder="Stipendio €" required 
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={form.stipendio} onChange={e => setForm({...form, stipendio: e.target.value})} 
          />
          <select 
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-semibold text-slate-700"
            value={form.ruolo} onChange={e => setForm({...form, ruolo: e.target.value})}
          >
            <option value="USER">USER (Operativo)</option>
            <option value="ADMIN">ADMIN (Direzione)</option>
          </select>

          <button 
            type="submit" 
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all flex justify-center items-center shadow-md shadow-purple-100 disabled:bg-purple-300"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Assumi"}
          </button>
        </form>
      </div>

      {/* Lista Collaboratori */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-slate-500 font-bold text-xs uppercase tracking-wider">Collaboratore</th>
                <th className="px-6 py-4 text-slate-500 font-bold text-xs uppercase tracking-wider text-center">Ruolo</th>
                <th className="px-6 py-4 text-slate-500 font-bold text-xs uppercase tracking-wider text-center">Stipendio</th>
                <th className="px-6 py-4 text-slate-500 font-bold text-xs uppercase tracking-wider text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dipendenti.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-400">Nessun dipendente trovato.</td>
                </tr>
              ) : (
                dipendenti.map(d => (
                  <tr key={d.id || d.email} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold border border-purple-200">
                          {d.nome?.[0]}{d.cognome?.[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{d.nome} {d.cognome}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail size={12} className="text-slate-400"/> {d.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-tight flex items-center gap-1 w-fit mx-auto ${
                        d.ruolo === 'ADMIN' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        <Shield size={10}/> {d.ruolo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-700">
                      € {Number(d.stipendio || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(d.id)} 
                        className="text-slate-300 hover:text-red-600 p-2 transition-all hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}