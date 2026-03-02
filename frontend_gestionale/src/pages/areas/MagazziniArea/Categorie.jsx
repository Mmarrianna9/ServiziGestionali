import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { PlusCircle, FolderTree, Loader2 } from 'lucide-react';

export default function Categorie() {
  const [categorie, setCategorie] = useState([]);
  const [nuovaCategoria, setNuovaCategoria] = useState("");
  const [loading, setLoading] = useState(false);

  // NOTA: Controlla se il tuo Spring Boot è sulla 8080 o 8081!
  const API_URL = 'http://localhost:8080/api/categorie';

  // 1. Recupera le categorie (Ottimizzato con useCallback)
  const fetchCategorie = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      // Estraiamo i dati dal wrapper ApiResponse (response.data.data)
      if (response.data && response.data.data) {
        setCategorie(response.data.data);
      }
    } catch (error) {
      console.error("Errore API Categorie:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategorie();
  }, [fetchCategorie]);

  // 2. Aggiunge una nuova categoria
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nuovaCategoria.trim()) return;

    setLoading(true);
    try {
      await axios.post(API_URL, { nome: nuovaCategoria });
      setNuovaCategoria(""); // Svuota l'input
      await fetchCategorie(); // Ricarica la lista aggiornata
    } catch (error) {
      console.error("Errore salvataggio:", error);
      alert("Impossibile salvare la categoria. Verifica la connessione al backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <FolderTree className="text-blue-600" size={32} /> 
            Categorie
          </h1>
          <p className="text-slate-500 mt-1">Gestisci le macro-aree del tuo magazzino</p>
        </div>
      </div>

      {/* Form di Inserimento */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <form onSubmit={handleAdd} className="flex gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={nuovaCategoria}
              onChange={(e) => setNuovaCategoria(e.target.value)}
              placeholder="Esempio: Elettronica, Ufficio, Alimentari..."
              className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              disabled={loading}
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !nuovaCategoria.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <PlusCircle size={20} />}
            Aggiungi
          </button>
        </form>
      </div>

      {/* Tabella Risultati */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Nome Categoria</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categorie.length > 0 ? (
              categorie.map((cat) => (
                <tr key={cat.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono font-medium">
                      ID-{cat.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700 font-medium">{cat.nome}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     {/* Qui potrai aggiungere un tasto Elimina in futuro */}
                     <span className="text-xs text-slate-400 italic">Sistema attivo</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <FolderTree size={40} className="opacity-20" />
                    <p>Nessuna categoria presente nel database.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}