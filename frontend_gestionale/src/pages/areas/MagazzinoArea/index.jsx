import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Prodotti from './Prodotti';
import Categorie from './Categorie';
import { Package, FolderTree } from 'lucide-react';

export default function MagazzinoArea() {
  const location = useLocation();

  // Stile per i tab attivi
  const activeTab = (path) => 
    location.pathname.includes(path) 
      ? "border-b-2 border-blue-600 text-blue-600" 
      : "text-slate-500 hover:text-slate-800";

  return (
    <div className="pt-16"> {/* Spazio per la Navbar fissa */}
      {/* Sotto-Menu orizzontale specifico per il Magazzino */}
      <div className="bg-white border-b border-slate-200 mb-6">
        <div className="max-w-6xl mx-auto flex gap-8 px-6">
          <Link to="/magazzino/prodotti" className={`py-4 flex items-center gap-2 font-semibold transition-all ${activeTab('prodotti')}`}>
            <Package size={18} /> Inventario Prodotti
          </Link>
          <Link to="/magazzino/categorie" className={`py-4 flex items-center gap-2 font-semibold transition-all ${activeTab('categorie')}`}>
            <FolderTree size={18} /> Gestione Categorie
          </Link>
        </div>
      </div>

      {/* Qui vengono caricate le due tabelle che abbiamo già fatto */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <Routes>
          <Route path="prodotti" element={<Prodotti />} />
          <Route path="categorie" element={<Categorie />} />
          {/* Default: se entro in /magazzino mi manda a prodotti */}
          <Route path="/" element={<Prodotti />} />
        </Routes>
      </div>
    </div>
  );
}