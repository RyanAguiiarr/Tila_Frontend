import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff, MdPersonAdd } from 'react-icons/md';
import SecurityBadges from '../../components/SecurityBadges/SecurityBadges';
import './Cadastro.css';
import { apiCadastro } from '../../api/cadastro/apiCadastro'

const Cadastro = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCadastro = () => {
    const req = {
      nome: document.getElementById('nome').value,
      crm: document.getElementById('crm').value,
      especialidade: document.getElementById('especialidade').value,
      email: document.getElementById('email').value,
      senha: document.getElementById('password').value,
    };
    apiCadastro.cadastrar(req);
    navigate('/login');
  }

  return (
    <div className="cadastro-card-container">
      <div className="cadastro-card">
        <div className="cadastro-header">
          <h1>Cadastro Médico</h1>
          <p>Crie sua conta profissional no Tila para gerar laudos automatizados.</p>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              placeholder="Dr. João da Silva"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="crm">CRM</label>
              <input
                type="text"
                id="crm"
                placeholder="000000-SP"
                className="form-input"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="especialidade">Especialidade</label>
              <input
                type="text"
                id="especialidade"
                placeholder="Radiologia"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail Profissional</label>
            <input
              type="email"
              id="email"
              placeholder="medico@clinica.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                className="form-input password-input"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn cadastro-submit-btn" onClick={handleCadastro}>
            <MdPersonAdd className="btn-icon" />
            Criar Conta
          </button>

          <div className="auth-switch-container">
            <span className="auth-switch-text">Já possui uma conta?</span>
            <button type="button" onClick={() => navigate('/login')} className="auth-switch-btn">
              Faça login
            </button>
          </div>
        </form>

        <SecurityBadges />
      </div>
    </div>
  );
};

export default Cadastro;
