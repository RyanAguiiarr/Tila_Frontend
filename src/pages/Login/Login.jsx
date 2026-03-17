import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff, MdLock } from 'react-icons/md';
import SecurityBadges from '../../components/SecurityBadges/SecurityBadges';
import './Login.css';
import { apiLogin } from '../../api/login/apiLogin';

const Login = ({ onNavigateToCadastro }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handling form submit behavior is outside the scope of this visual task
  };

  const handlelogin = () => {
    const req = {
      email: document.getElementById('email').value,
      senha: document.getElementById('password').value,
    };
    apiLogin.login(req);
  }

  return (
    <div className="login-card-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Login Seguro</h1>
          <p>Acesse seu painel médico profissional e prontuários de pacientes.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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
            <div className="password-header">
              <label htmlFor="password">Senha</label>
              <a href="#forgot" className="forgot-password">Esqueceu a senha?</a>
            </div>
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

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" className="custom-checkbox" />
              <span className="checkmark"></span>
              Manter conectado neste dispositivo
            </label>
          </div>

          <button type="submit" className="submit-btn" onClick={handlelogin}>
            <MdLock className="btn-icon" />
            Login Seguro
          </button>

          <div className="auth-switch-container" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.875rem' }}>
            <span className="auth-switch-text" style={{ color: 'var(--text-gray)' }}>Não possui uma conta?</span>
            <button 
              type="button" 
              onClick={onNavigateToCadastro} 
              className="auth-switch-btn" 
              style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
            >
              Cadastre-se
            </button>
          </div>
        </form>

        <SecurityBadges />
      </div>
    </div>
  );
};

export default Login;
