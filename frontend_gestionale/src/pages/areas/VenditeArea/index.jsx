import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { ShoppingBag, Tag, Box, ArrowRightCircle, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function VenditeArea() {
  const [prodotti, setProdotti] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [catSelezionata, setCatSelezionata] = useState('Tutte');
  const [messaggio, setMessaggio] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const API_PROD = 'http://localhost:8080/api/prodotti';
  const API_CAT = 'http://localhost:8080/api/categorie';

  // 1. Caricamento dati stabile con useCallback
  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [resP, resC] = await Promise.all([
        axios.get(API_PROD),
        axios.get(API_CAT)
      ]);
      setProdotti(resP.data.data || []);
      setCategorie(resC.data.data || []);
    } catch (err) {
      console.error("Errore nel caricamento dei dati:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 2. LOGICA PULITA: Calcolo dei prodotti filtrati senza usare setState
  // Questo evita l'errore "cascading renders"
  const prodottiFiltrati = useMemo(() => {
    return catSelezionata === 'Tutte' 
      ? prodotti 
      : prodotti.filter(p => p.categoria?.nome === catSelezionata);
  }, [catSelezionata, prodotti]);

  // 3. Gestione della vendita
  const gestisciVendita = async (prodotto) => {
    if (prodotto.quantita <= 0) return;

    try {
      // Sottrazione stock lato backend
      await axios.put(`${API_PROD}/${prodotto.id}`, {
        ...prodotto,
        quantita: prodotto.quantita - 1
      });
      
      setMessaggio({ testo: `Venduto: ${prodotto.titolo}`, tipo: 'success' });
      fetchData(); // Ricarica i dati per aggiornare i contatori
    } catch (err) {
      console.error("Errore vendita:", err);
      setMessaggio({ testo: "Errore durante la transazione", tipo: 'error' });
    }
  };

  // 4. Effetto separato per la sparizione automatica del messaggio
  useEffect(() => {
    if (messaggio) {
      const timer = setTimeout(() => setMessaggio(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [messaggio]);

  return (
    <div className="pt-20 px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header e Notifiche */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
            <ShoppingBag size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Terminale Vendite</h1>
            <p className="text-slate-500 text-sm">Seleziona i prodotti per lo scarico magazzino</p>
          </div>
        </div>
        
        {/* Banner di Feedback */}
        <div className="h-12 flex items-center">
          {messaggio && (
            <div className={`flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right-4 ${
              messaggio.tipo === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
            }`}>
              {messaggio.tipo === 'success' ? <CheckCircle2 size={18}/> : <AlertCircle size={18}/>}
              <span className="font-bold">{messaggio.testo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Filtro Categorie Rapido */}
      <div className="flex flex-wrap gap-3 p-1 bg-slate-100 w-fit rounded-2xl">
        <button 
          onClick={() => setCatSelezionata('Tutte')}
          className={`px-6 py-2 rounded-xl font-bold transition-all text-sm ${
            catSelezionata === 'Tutte' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Tutti i prodotti
        </button>
        {categorie.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setCatSelezionata(cat.nome)}
            className={`px-6 py-2 rounded-xl font-bold transition-all text-sm ${
              catSelezionata === cat.nome ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {cat.nome}
          </button>
        ))}
        {isRefreshing && <Loader2 className="animate-spin text-slate-400 m-2" size={18} />}
      </div>

      {/* Griglia Prodotti */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
        {prodottiFiltrati.length > 0 ? prodottiFiltrati.map(p => (
          <div key={p.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-widest border border-emerald-100">
                  {p.categoria?.nome || 'Genérico'}
                </span>
                <div className={`flex items-center gap-1 text-xs font-bold ${p.quantita < 5 ? 'text-red-500' : 'text-slate-400'}`}>
                  <Box size={14}/> {p.quantita}
                </div>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight group-hover:text-emerald-600 transition-colors">{p.titolo}</h3>
              <p className="text-slate-500 text-xs line-clamp-3 mb-6 leading-relaxed italic">"{p.descrizione}"</p>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">
                €{p.prezzo?.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </div>
            </div>
            
            <button 
              disabled={p.quantita <= 0}
              onClick={() => gestisciVendita(p)}
              className={`w-full py-5 flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest transition-all ${
                p.quantita > 0 
                ? 'bg-slate-900 text-white hover:bg-emerald-600' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {p.quantita > 0 ? (
                <><ArrowRightCircle size={20} /> Conferma Vendita</>
              ) : (
                "Esaurito in Magazzino"
              )}
            </button>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium italic">Nessun prodotto disponibile in questa categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}