import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Dashboard from './pages/Dashboard/Dashboard';
import Pacientes from './pages/Pacientes/Pacientes';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('pacientes');

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const isInternalScreen = currentScreen === 'dashboard' || currentScreen === 'pacientes';

  return (
    <div className="app-container">
      {!isInternalScreen && <Header />}
      <main className={isInternalScreen ? "" : "main-content"}>
        {currentScreen === 'login' && (
          <Login onNavigateToCadastro={() => handleNavigate('cadastro')} onLoginSuccess={() => handleNavigate('dashboard')} />
        )}
        {currentScreen === 'cadastro' && (
          <Cadastro onNavigateToLogin={() => handleNavigate('login')} />
        )}
        {currentScreen === 'dashboard' && (
          <Dashboard onNavigate={handleNavigate} />
        )}
        {currentScreen === 'pacientes' && (
          <Pacientes onNavigate={handleNavigate} />
        )}
      </main>
      {!isInternalScreen && <Footer />}
    </div>
  );
}

export default App;
