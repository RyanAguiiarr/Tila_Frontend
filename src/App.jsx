import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Dashboard from './pages/Dashboard/Dashboard';
import Pacientes from './pages/Pacientes/Pacientes';
import './App.css';

function App() {
  const location = useLocation();
  const currentScreen = location.pathname.split('/')[1] || 'login';
  const isInternalScreen = currentScreen === 'dashboard' || currentScreen === 'pacientes';

  return (
    <div className="app-container">
      {!isInternalScreen && <Header />}
      <main className={isInternalScreen ? "" : "main-content"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pacientes" element={<Pacientes />} />
        </Routes>
      </main>
      {!isInternalScreen && <Footer />}
    </div>
  );
}

export default App;
