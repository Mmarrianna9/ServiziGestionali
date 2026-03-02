import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Package, AlertTriangle, Euro, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totaleProdotti: 0,
    valoreMagazzino: 0,
    sottoScorta: 0,
    numeroCategorie: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProd, resCat] = await Promise.all([
          axios.get('http://localhost:8080/api/prodotti'),
          axios.get('http://localhost:8080/api/categorie')
        ]);

        const prodotti = resProd.data.data || [];
        const categorie = resCat.data.data || [];

        // Calcoli statistici
        const valore = prodotti.reduce((acc, p) => acc + (p.prezzo * p.quantita), 0);
        const alert = prodotti.filter(p => p.quantita < 5).length;

        setStats({
          totaleProdotti: prodotti.length,
          valoreMagazzino: valore,
          sottoScorta: alert,
          numeroCategorie: categorie.length
        });
      } catch (error) {
        console.error("Errore statistiche:", error);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { title: "Prodotti Totali", value: stats.totaleProdotti, icon: <Package size={24}/>, color: "bg-blue-500" },
    { title: "Valore Totale", value: `€${stats.valoreMagazzino.toFixed(2)}`, icon: <Euro size={24}/>, color: "bg-emerald-500" },
    { title: "Sotto Scorta (<5)", value: stats.sottoScorta, icon: <AlertTriangle size={24}/>, color: stats.sottoScorta > 0 ? "bg-amber-500" : "bg-slate-400" },
    { title: "Categorie", value: stats.numeroCategorie, icon: <BarChart3 size={24}/>, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Panoramica</h1>
      </div>

      {/* Grid delle Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className={`${card.color} p-3 rounded-xl text-white shadow-lg`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sezione Suggerimenti/Stato */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
        <h3 className="text-blue-800 font-bold flex items-center gap-2 mb-2">
          <AlertTriangle size={18} /> Stato Magazzino
        </h3>
        <p className="text-blue-700">
          {stats.sottoScorta > 0 
            ? `Attenzione: ci sono ${stats.sottoScorta} prodotti che necessitano di un riordino immediato.` 
            : "Tutti i livelli di scorta sono ottimali. Ben fatto!"}
        </p>
      </div>
    </div>
  );
}