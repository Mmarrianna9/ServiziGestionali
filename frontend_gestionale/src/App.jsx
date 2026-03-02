import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & UI
import NavbarDinamica from './components/NavbarDinamica';
import LandingPage from './pages/LandingPage';
import Login from './pages/areas/Login';

// Aree Specializzate
import MagazzinoArea from './pages/areas/MagazzinoArea';
import VenditeArea from './pages/areas/VenditeArea';
import UfficioArea from './pages/areas/UfficioArea';

const App = () => {
  // Stato utente: Inizializzato con l'email admin per i test
  // Cambia l'email in 'magazzino@example.it' per testare le restrizioni
  const [user, setUser] = useState({ 
    nome: "Admin", 
    email: "admin@example.it", 
    ruolo: "ADMIN" 
  });

  const handleLogout = () => {
    setUser(null);
  };

  // Helper per controllare i permessi in modo pulito
  const hasAccess = (requiredEmail) => {
    if (!user) return false;
    // L'admin@example.it è un "SuperUser" e vede tutto, altrimenti serve l'email specifica
    return user.email === "admin@example.it" || user.email === requiredEmail;
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
        
        {/* Mostra Navbar solo se loggato */}
        {user && (
          <NavbarDinamica 
            user={user} 
            onLogout={handleLogout} 
          />
        )}

        <main className="flex-grow pt-20 pb-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
          <div className="max-w-7xl mx-auto h-full">
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage user={user} />} />

              {/* Login: Se già loggato va alla Home */}
              <Route 
                path="/login" 
                element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} 
              />

              {/* AREA MAGAZZINO: Accesso magazzino@example.it o admin */}
              <Route 
                path="/magazzino/*" 
                element={
                  hasAccess("magazzino@example.it") ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <MagazzinoArea />
                    </div>
                  ) : <Navigate to="/" replace />
                } 
              />

              {/* AREA VENDITE: Accesso vendite@example.it o admin */}
              <Route 
                path="/vendite/*" 
                element={
                  hasAccess("vendite@example.it") ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <VenditeArea />
                    </div>
                  ) : <Navigate to="/" replace />
                } 
              />

              {/* AREA UFFICIO: Accesso ESCLUSIVO admin@example.it */}
              <Route 
                path="/ufficio/*" 
                element={
                  user?.email === "admin@example.it" ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <UfficioArea />
                    </div>
                  ) : <Navigate to="/" replace />
                } 
              />

              {/* Fallback per rotte inesistenti */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>

        <footer className="py-6 text-center text-slate-400 text-xs border-t border-slate-200 bg-white/50">
          &copy; 2026 Gestionale Enterprise • Accesso Riservato
        </footer>
      </div>
    </Router>
  );
};

export default App;