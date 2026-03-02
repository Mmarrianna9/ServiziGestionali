import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & UI
import NavbarDinamica from './components/NavbarDinamica';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

// Aree Specializzate
import MagazzinoArea from './pages/areas/MagazzinoArea';
import VenditeArea from './pages/areas/VenditeArea';
import UfficioArea from './pages/areas/UfficioArea';

function App() {
  const [user, setUser] = useState(null); // null = non loggato

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        {/* La Navbar appare solo se siamo dentro un'area o dopo il login */}
        {user && <NavbarDinamica user={user} setUser={setUser} />}

        <Routes>
          {/* 1. Pagina Iniziale Neutra */}
          <Route path="/" element={<LandingPage user={user} />} />

          {/* 2. Login */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* 3. Aree Protette (Accessibili solo se loggati) */}
          <Route path="/magazzino/*" element={user ? <MagazzinoArea /> : <Navigate to="/login" />} />
          <Route path="/vendite/*" element={user ? <VenditeArea /> : <Navigate to="/login" />} />
          <Route path="/ufficio/*" element={user ? <UfficioArea /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;