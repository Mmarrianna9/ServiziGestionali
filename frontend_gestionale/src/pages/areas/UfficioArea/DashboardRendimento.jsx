import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Trophy, Package, TrendingUp } from 'lucide-react';

// Dati finti (che poi sostituirai con Axios)
const datiVendite = [
  { mese: 'Gen', fatturato: 4000 },
  { mese: 'Feb', fatturato: 3000 },
  { mese: 'Mar', fatturato: 5000 },
  { mese: 'Apr', fatturato: 4500 },
  { mese: 'Mag', fatturato: 6000 },
  { mese: 'Giu', fatturato: 8500 },
];

const datiMagazzino = [
  { cat: 'Elettronica', stock: 400 },
  { cat: 'Arredi', stock: 210 },
  { cat: 'Ricambi', stock: 480 },
  { cat: 'Utensili', stock: 150 },
];

// Prodotto più venduto (Mock Data)
const topProduct = {
  nome: "Trapano Professionale GT-500",
  vendite: 1240,
  crescita: "+15%",
  rimanenza: 45
};

const DashboardRendimento = () => {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      
      {/* SEZIONE SUPERIORE: TOP PRODUCT & STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card Prodotto Top Seller */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-orange-400 mb-2">
              <Trophy size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Top Seller del Mese</span>
            </div>
            <h3 className="text-xl font-bold">{topProduct.nome}</h3>
            <p className="text-slate-400 text-sm mt-1">{topProduct.vendite} unità vendute</p>
          </div>
          <div className="text-right">
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
              {topProduct.crescita}
            </span>
            <div className="mt-4">
              <p className="text-xs text-slate-400">Stock residuo</p>
              <p className="text-lg font-mono font-bold">{topProduct.rimanenza}</p>
            </div>
          </div>
        </div>

        {/* Altre due mini stats rapide */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-xl"><TrendingUp /></div>
          <div>
            <p className="text-slate-500 text-sm">Fatturato Totale</p>
            <p className="text-2xl font-bold">€31.000</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl"><Package /></div>
          <div>
            <p className="text-slate-500 text-sm">Articoli Sottoscorta</p>
            <p className="text-2xl font-bold text-red-600">12</p>
          </div>
        </div>
      </div>

      {/* SEZIONE GRAFICI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Grafico Vendite (Area) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Andamento Performance Vendite</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={datiVendite}>
              <defs>
                <linearGradient id="colorFatt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="mese" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="fatturato" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorFatt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grafico Magazzino (Bar) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Distribuzione Scorte Magazzino</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={datiMagazzino}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="cat" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="stock" radius={[6, 6, 0, 0]}>
                {datiMagazzino.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.stock < 200 ? '#ef4444' : '#334155'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default DashboardRendimento;