import React, { useState } from 'react';
import { Users, Briefcase, Truck, BarChart3, UserCheck } from 'lucide-react';

// Importiamo i componenti corretti
import DashboardRendimento from './DashboardRendimento';
import TabellaDipendenti from './TabellaDipendenti';
import TabellaClienti from './TabellaClienti';
import TabellaFornitori from './TabellaFornitori';

export default function UfficioArea() {
  // Gestione dei Tab: il default è ora 'grafici' che punta a DashboardRendimento
  const [tabAttivo, setTabAttivo] = useState('grafici');

  const menu = [
    { id: 'grafici', label: 'Report & Grafici', icon: <BarChart3 size={18}/> },
    { id: 'dipendenti', label: 'Personale', icon: <UserCheck size={18}/> },
    { id: 'clienti', label: 'Anagrafica Clienti', icon: <Users size={18}/> },
    { id: 'fornitori', label: 'Fornitori', icon: <Truck size={18}/> },
  ];

  return (
    <div className="pt-24 px-8 max-w-7xl mx-auto min-h-screen bg-slate-50">
      
      {/* Header dell'Area */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-600 rounded-xl text-white shadow-lg shadow-purple-200">
          <Briefcase size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Ufficio & Amministrazione</h1>
          <p className="text-slate-500 font-medium">Gestione moduli amministrativi e analisi dati</p>
        </div>
      </div>

      {/* Navigazione Tab */}
      <div className="flex gap-2 mb-8 border-b border-slate-200 overflow-x-auto scrollbar-hide">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setTabAttivo(item.id)}
            className={`flex items-center gap-2 px-6 py-4 font-bold transition-all duration-200 whitespace-nowrap ${
              tabAttivo === item.id 
              ? "border-b-4 border-purple-600 text-purple-600" 
              : "text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 rounded-t-lg"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Area Contenuto Dinamico */}
      <div className="pb-12">
        {tabAttivo === 'grafici' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <DashboardRendimento />
          </div>
        )}

        {tabAttivo === 'dipendenti' && (
          <div className="animate-in fade-in duration-300">
            <TabellaDipendenti />
          </div>
        )}

        {tabAttivo === 'clienti' && (
          <div className="animate-in fade-in duration-300">
            <TabellaClienti />
          </div>
        )}

        {tabAttivo === 'fornitori' && (
          <div className="animate-in fade-in duration-300">
            <TabellaFornitori />
          </div>
        )}
      </div>
    </div>
  );
}