import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & UI
import NavbarDinamica from './components/NavbarDinamica';
import LandingPage from './pages/LandingPage';
import Login from './pages/areas/Login'; // Rimosso .jsx per pulizia

// Aree Specializzate
import MagazzinoArea from './pages/areas/MagazzinoArea';
import VenditeArea from './pages/areas/VenditeArea';
import UfficioArea from './pages/areas/UfficioArea';

const App = () => {
  // Stato utente: in futuro potrai salvarlo nel localStorage
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Mostra Navbar solo se l'utente è autenticato */}
        {user && <NavbarDinamica user={user} onLogout={() => setUser(null)} />}

        <main className="flex-grow">
          <Routes>
            {/* Landing Page: accessibile a tutti */}
            <Route path="/" element={<LandingPage user={user} />} />

            {/* Login: se già loggato, reindirizza al magazzino */}
            <Route 
              path="/login" 
              element={user ? <Navigate to="/magazzino" /> : <Login setUser={setUser} />} 
            />

            {/* Rotte Protette */}
            <Route 
              path="/magazzino/*" 
              element={user ? <MagazzinoArea /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/vendite/*" 
              element={user ? <VenditeArea /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/ufficio/*" 
              element={user ? <UfficioArea /> : <Navigate to="/login" />} 
            />

            {/* Fallback: se la rotta non esiste torna alla Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;