import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Dashboard from './pages/Dashboard/Dashboard';
import Pacientes from './pages/Pacientes/Pacientes';
import CadastroPaciente from './pages/CadastroPaciente/CadastroPaciente';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const currentScreen = location.pathname.split('/')[1] || 'login';
  const isInternalScreen = currentScreen === 'dashboard' || currentScreen === 'pacientes';

  const fetchProfile = useAuthStore((state) => state.fetchProfile);

  useEffect(() => {
    fetchProfile(); // Tenta recuperar a sessão via cookie ao iniciar
  }, []);

  return (
    <div className="app-container">
      {!isInternalScreen && <Header />}
      <main className={isInternalScreen ? "" : "main-content"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/pacientes/novo" element={<CadastroPaciente />} />
          </Route>
        </Routes>
      </main>
      {!isInternalScreen && <Footer />}
    </div>
  );
}

export default App;
