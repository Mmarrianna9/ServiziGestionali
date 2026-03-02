import React, { useState } from 'react';
import { Users, Briefcase, Truck, BarChart3, UserCheck } from 'lucide-react';
// Importiamo i componenti che creeremo tra un attimo
import TabellaDipendenti from './TabellaDipendenti';
import TabellaClienti from './TabellaClienti';
import TabellaFornitori from './TabellaFornitori';
import GraficiBusiness from './GraficiBusiness';

export default function UfficioArea() {
  const [tabAttivo, setTabAttivo] = useState('grafici');

  const menu = [
    { id: 'grafici', label: 'Report & Grafici', icon: <BarChart3 size={18}/> },
    { id: 'dipendenti', label: 'Personale', icon: <UserCheck size={18}/> },
    { id: 'clienti', label: 'Anagrafica Clienti', icon: <Users size={18}/> },
    { id: 'fornitori', label: 'Fornitori', icon: <Truck size={18}/> },
  ];

  return (
    <div className="pt-20 px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Briefcase className="text-purple-600" size={32} />
        <h1 className="text-3xl font-bold text-slate-800">Area Ufficio & Amministrazione</h1>
      </div>

      {/* Navigazione Interna Ufficio */}
      <div className="flex gap-4 mb-8 border-b border-slate-200">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setTabAttivo(item.id)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
              tabAttivo === item.id 
              ? "border-b-2 border-purple-600 text-purple-600" 
              : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* Rendering Condizionale dei componenti */}
      <div className="animate-in fade-in duration-500">
        {tabAttivo === 'grafici' && <GraficiBusiness />}
        {tabAttivo === 'dipendenti' && <TabellaDipendenti />}
        {tabAttivo === 'clienti' && <TabellaClienti />}
        {tabAttivo === 'fornitori' && <TabellaFornitori />}
      </div>
    </div>
  );
}