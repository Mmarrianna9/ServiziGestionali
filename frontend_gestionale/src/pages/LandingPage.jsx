import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function LandingPage({ user }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      {/* LOGO AL CENTRO */}
      <div className="animate-bounce mb-8">
        <div className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
          <ShieldCheck size={64} className="text-white" />
        </div>
      </div>
      
      <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-2">
        CORP-SYSTEM <span className="text-blue-600">v3</span>
      </h1>
      <p className="text-slate-400 mb-8 font-medium">Seleziona un'area operativa per iniziare</p>

      {!user ? (
        <Link 
          to="/login" 
          className="bg-slate-900 text-white px-10 py-3 rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl"
        >
          Accedi al Sistema
        </Link>
      ) : (
        <p className="text-green-600 font-bold italic text-sm">Autenticato come: {user.nome}</p>
      )}
    </div>
  );
}