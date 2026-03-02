import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutGrid, BarChart, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <header className="pt-24 pb-16 px-6 text-center bg-gradient-to-b from-slate-50 to-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Servizi <span className="text-orange-600">Gestionali</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10">
          La piattaforma modulare per la gestione aziendale: magazzino, vendite e risorse umane in un unico posto.
        </p>
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl"
        >
          Inizia Ora <ArrowRight size={20} />
        </Link>
      </header>

      {/* Mini-features */}
      <section className="py-12 border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="flex flex-col items-center text-center">
            <LayoutGrid className="text-orange-500 mb-4" size={40} />
            <h3 className="font-bold">Interfaccia Modulare</h3>
          </div>
          <div className="flex flex-col items-center text-center">
            <BarChart className="text-orange-500 mb-4" size={40} />
            <h3 className="font-bold">Dati Real-time</h3>
          </div>
          <div className="flex flex-col items-center text-center">
            <Shield className="text-orange-500 mb-4" size={40} />
            <h3 className="font-bold">Accesso Protetto</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;