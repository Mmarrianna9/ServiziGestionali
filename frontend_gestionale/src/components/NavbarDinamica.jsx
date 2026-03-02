import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Package, ShoppingCart, Building2, LogOut } from 'lucide-react';

export default function NavbarDinamica({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const menuItems = [
    { label: 'Magazzino', path: '/magazzino', icon: <Package size={20}/>, role: 'USER' },
    { label: 'Area Vendite', path: '/vendite', icon: <ShoppingCart size={20}/>, role: 'USER' },
    { label: 'Ufficio (Admin)', path: '/ufficio', icon: <Building2 size={20}/>, role: 'ADMIN' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b flex items-center px-6 z-50">
      {/* Bottone Menu a sinistra */}
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
        {isOpen ? <X /> : <Menu />}
      </button>

      <span className="ml-4 font-bold text-slate-700">Gestionale Multi-Area</span>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-6 w-64 bg-white shadow-2xl border rounded-xl p-2 animate-in slide-in-from-top-2">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
            >
              {item.icon} <span className="font-semibold text-sm">{item.label}</span>
            </Link>
          ))}
          <hr className="my-2" />
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut size={20} /> <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}