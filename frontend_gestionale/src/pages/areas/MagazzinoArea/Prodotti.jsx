

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Package, PlusCircle, Loader2, Tag, Trash2, AlertCircle } from 'lucide-react';

export default function Prodotti() {
  const [prodotti, setProdotti] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Stato per il form di inserimento
  const [form, setForm] = useState({
    titolo: "",
    descrizione: "",
    prezzo: "",
    quantita: "",
    categoriaId: ""
  });

  // URL del tuo Backend (Assicurati che la porta sia corretta: 8080 o 8081)
  const API_PRODOTTI = 'http://localhost:8080/api/prodotti';
  const API_CATEGORIE = 'http://localhost:8080/api/categorie';

  // 1. Funzione per caricare Dati (Prodotti + Categorie)
  const fetchData = useCallback(async () => {
    try {
      const [resProd, resCat] = await Promise.all([
        axios.get(API_PRODOTTI),
        axios.get(API_CATEGORIE)
      ]);
      
      if (resProd.data.data) setProdotti(resProd.data.data);
      if (resCat.data.data) setCategorie(resCat.data.data);
    } catch (error) {
      console.error("Errore nel caricamento dei dati:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 2. Funzione per aggiungere un prodotto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.categoriaId) return alert("Seleziona una categoria!");

    setLoading(true);
    const prodottoDaInviare = {
      titolo: form.titolo,
      descrizione: form.descrizione,
      prezzo: parseFloat(form.prezzo),
      quantita: parseInt(form.quantita),
      categoria: { id: parseInt(form.categoriaId) } // Relazione Many-to-One
    };

    try {
      await axios.post(API_PRODOTTI, prodottoDaInviare);
      setForm({ titolo: "", descrizione: "", prezzo: "", quantita: "", categoriaId: "" });
      fetchData(); // Ricarica la tabella
    } catch (error) {
      console.error("Errore salvataggio:", error);
      alert("Errore nel salvataggio del prodotto.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Funzione per eliminare un prodotto
  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      try {
        await axios.delete(`${API_PRODOTTI}/${id}`);
        fetchData(); // Aggiorna la lista
      } catch (error) {
        console.error("Errore eliminazione:", error);
        alert("Impossibile eliminare il prodotto.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Package className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-slate-800">Gestione Magazzino</h1>
      </div>

      {/* Form Inserimento */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 flex items-center gap-2">
          <PlusCircle size={18} /> Nuovo Prodotto
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text" placeholder="Nome Prodotto" required
            className="p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.titolo} onChange={e => setForm({...form, titolo: e.target.value})}
          />
          <input 
            type="number" placeholder="Prezzo (€)" step="0.01" required
            className="p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.prezzo} onChange={e => setForm({...form, prezzo: e.target.value})}
          />
          <input 
            type="number" placeholder="Quantità" required
            className="p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.quantita} onChange={e => setForm({...form, quantita: e.target.value})}
          />
          <select 
            required
            className="p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.categoriaId} onChange={e => setForm({...form, categoriaId: e.target.value})}
          >
            <option value="">Scegli Categoria...</option>
            {categorie.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>

          <textarea 
            placeholder="Descrizione prodotto..."
            className="p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2 lg:col-span-3"
            value={form.descrizione} onChange={e => setForm({...form, descrizione: e.target.value})}
          />

          <button 
            type="submit" disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-md active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
            Salva
          </button>
        </form>
      </div>

      {/* Tabella Prodotti */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Prodotto</th>
              <th className="px-6 py-4">Categoria</th>
              <th className="px-6 py-4 text-center">Prezzo</th>
              <th className="px-6 py-4 text-center">Stock</th>
              <th className="px-6 py-4 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {prodotti.length > 0 ? prodotti.map(prod => (
              <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{prod.titolo}</div>
                  <div className="text-xs text-slate-500 max-w-xs truncate">{prod.descrizione}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100">
                    <Tag size={12} /> {prod.categoria?.nome || 'Senza Categoria'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-mono font-medium text-slate-700">
                  €{prod.prezzo?.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${prod.quantita < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {prod.quantita} pz
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(prod.id)}
                    className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle size={40} className="opacity-20" />
                    <p>Nessun prodotto trovato. Inizia aggiungendone uno!</p>
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