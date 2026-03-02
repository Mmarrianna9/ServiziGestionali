import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Settings, FolderTree } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20}/> },
    { name: 'Categorie', path: '/categorie', icon: <FolderTree size={20}/> },
    { name: 'Prodotti', path: '/prodotti', icon: <Package size={20}/> },
    { name: 'Dipendenti', path: '/dipendenti', icon: <Users size={20}/> },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen text-white fixed left-0 top-0 p-4 shadow-xl">
      <div className="text-2xl font-bold mb-10 px-2 text-blue-400">Gestionale v2</div>
      <nav>
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors mb-1"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

