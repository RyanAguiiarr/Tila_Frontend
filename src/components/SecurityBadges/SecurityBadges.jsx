import React from 'react';
import { MdVerifiedUser, MdOutlineShield } from 'react-icons/md';
import './SecurityBadges.css';

const SecurityBadges = () => {
  return (
    <div className="security-badges">
      <div className="badge badge-lgpd">
        <div className="badge-icon-wrapper green-bg">
          <MdVerifiedUser className="badge-icon green-icon" />
        </div>
        <div className="badge-text">
          <span className="badge-label">CERTIFICADO</span>
          <span className="badge-value">Conforme LGPD</span>
        </div>
      </div>
      
      <div className="badge badge-security">
        <div className="badge-icon-wrapper blue-bg">
          <MdOutlineShield className="badge-icon blue-icon" />
        </div>
        <div className="badge-text">
          <span className="badge-label">SEGURANÇA</span>
          <span className="badge-value">AES-256 Bit</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;
