import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Package, ShoppingCart, Building2, LogOut, Zap } from 'lucide-react';

// Sottocomponente per il Logo (Elettronica & Elettrodomestici)
const LogoAziendale = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
    <Zap className="text-white fill-current" size={22} />
  </div>
);

export default function NavbarDinamica({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); 
    setIsOpen(false);
    navigate('/login');
  };

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

        {/* Logo e Nome */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
          <LogoAziendale />
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-800 text-sm leading-none tracking-tight">
              ELETTRO<span className="text-indigo-600">PRO</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Electronics Store
            </span>
          </div>
        </div>
      </div>

      {/* Badge Utente */}
      <div className="flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
        <div className="w-6 h-6 bg-gradient-to-tr from-slate-700 to-slate-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
          {user?.nome?.[0] || 'U'}
        </div>
        <span className="text-xs font-bold text-slate-600 hidden sm:block">{user?.email}</span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/10" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute top-20 left-6 w-72 bg-white shadow-2xl border border-slate-200 rounded-2xl p-3 animate-in fade-in zoom-in-95 duration-200 z-50">
            <div className="px-3 py-2 mb-2 flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aree Disponibili</p>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[9px] font-bold rounded-full">LIVE</span>
            </div>

            {visibleItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group"
              >
                <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">
                  {item.icon}
                </div>
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