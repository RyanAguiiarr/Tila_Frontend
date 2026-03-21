import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2026 Tila. Todos os direitos reservados.</p>
      <div className="footer-links">
        <a href="#privacidade">Política de Privacidade</a>
        <span className="separator">|</span>
        <a href="#termos">Termos de Serviço</a>
      </div>
    </footer>
  );
};

export default Footer;
