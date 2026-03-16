import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {currentScreen === 'login' ? (
          <Login onNavigateToCadastro={() => setCurrentScreen('cadastro')} />
        ) : (
          <Cadastro onNavigateToLogin={() => setCurrentScreen('login')} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
