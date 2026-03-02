import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Package, ShoppingCart, Building2, LogOut, User as UserIcon } from 'lucide-react';

export default function NavbarDinamica({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Chiama la funzione passata da App.jsx
    setIsOpen(false);
    navigate('/login');
  };

  // Definizione dei link con l'email richiesta per vederli
  const menuItems = [
    { 
      label: 'Magazzino', 
      path: '/magazzino', 
      icon: <Package size={20}/>, 
      requiredEmail: 'magazzino@example.it' 
    },
    { 
      label: 'Area Vendite', 
      path: '/vendite', 
      icon: <ShoppingCart size={20}/>, 
      requiredEmail: 'vendite@example.it' 
    },
    { 
      label: 'Ufficio (Admin)', 
      path: '/ufficio', 
      icon: <Building2 size={20}/>, 
      requiredEmail: 'admin@example.it' 
    },
  ];

  // FILTRO LOGICO: Mostra l'item se l'utente è l'admin globale O se l'email coincide
  const visibleItems = menuItems.filter(item => 
    user?.email === "admin@example.it" || user?.email === item.requiredEmail
  );

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-6 z-50 justify-between">
      <div className="flex items-center gap-4">
        {/* Toggle Menu */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-lg tracking-tight">
          GESTIONALE PRO
        </span>
      </div>

      {/* Badge Utente a destra */}
      <div className="flex items-center gap-3 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
          {user?.nome?.[0] || 'U'}
        </div>
        <span className="text-xs font-bold text-slate-700 hidden sm:block">{user?.email}</span>
      </div>

      {/* Dropdown Menu Dinamico */}
      {isOpen && (
        <>
          {/* Overlay per chiudere il menu cliccando fuori */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute top-20 left-6 w-72 bg-white shadow-2xl border border-slate-200 rounded-2xl p-3 animate-in fade-in zoom-in-95 duration-200 z-50">
            <div className="px-3 py-2 mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Menu Accessibile</p>
            </div>

            {visibleItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group"
              >
                <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">
                  {item.icon}
                </span>
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            ))}

            <div className="my-3 border-t border-slate-100"></div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all group"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" /> 
              <span className="font-bold text-sm">Esci dal sistema</span>
            </button>
          </div>
        </>
      )}
    </nav>
  );
}