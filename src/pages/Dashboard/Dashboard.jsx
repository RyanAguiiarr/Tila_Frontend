import React, { useState } from 'react';
import { 
  MdDashboard, 
  MdPeople, 
  MdDescription, 
  MdAutoGraph, 
  MdCalendarToday, 
  MdSettings,
  MdSearch,
  MdNotifications,
  MdAdd,
  MdKeyboardArrowRight,
  MdLibraryBooks,
  MdLayers,
  MdAutoAwesome,
  MdMenu,
  MdClose
} from 'react-icons/md';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
              <path d="M12 2L2 12l10 10 10-10L12 2z" fill="currentColor" />
              <path d="M12 2L2 12l10 10V2z" fill="#0b57d0" />
              <path d="M12 2l10 10-10 10V2z" fill="#1a73e8" />
            </svg>
            <span className="logo-text">Tila Medical</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item active">
              <MdDashboard className="nav-icon" />
              <span>Painel</span>
            </li>
            <li className="nav-item" onClick={() => onNavigate && onNavigate('pacientes')}>
              <MdPeople className="nav-icon" />
              <span>Pacientes</span>
            </li>
            <li className="nav-item">
              <MdDescription className="nav-icon" />
              <span>Laudos</span>
            </li>
            <li className="nav-item">
              <MdAutoGraph className="nav-icon" />
              <span>Insights de IA</span>
            </li>
            <li className="nav-item">
              <MdCalendarToday className="nav-icon" />
              <span>Agenda</span>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="nav-item settings-item">
            <MdSettings className="nav-icon" />
            <span>Configurações</span>
          </div>
          <div className="user-profile">
            <div className="user-avatar">
              <img src="https://ui-avatars.com/api/?name=Julian+Smith&background=0D8ABC&color=fff" alt="Dr. Julian Smith" />
            </div>
            <div className="user-info">
              <span className="user-name">Dr. Julian Smith</span>
              <span className="user-role">Radiologista</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Abrir Menu"
            >
              <MdMenu />
            </button>
            <div className="search-bar">
              <MdSearch className="search-icon" />
              <input type="text" placeholder="Busca rápida de paciente..." />
            </div>
          </div>
          <div className="header-actions">
            <div className="notification-bell">
              <MdNotifications className="bell-icon" />
              <span className="notification-dot"></span>
            </div>
            <button className="btn-primary">
              <MdAdd className="btn-icon" />
              <span className="btn-text">Novo Laudo</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-content">
          <div className="page-title">
            <h1>Painel do Médico</h1>
            <p>Bem-vindo de volta, Dr. Smith. Aqui está sua visão geral de hoje, 24 de Out.</p>
          </div>
          
          {/* Summary Cards */}
          <div className="summary-cards">
            {/* Card 1 */}
            <div className="summary-card">
              <div className="card-header">
                <span className="card-title">Laudos Este Mês</span>
                <MdDescription className="card-icon blue-icon" />
              </div>
              <div className="card-body">
                <span className="card-value">1.284</span>
                <span className="card-trend positive">+12%~</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="summary-card">
              <div className="card-header">
                <span className="card-title">Eficiência Média da IA</span>
                <MdAutoGraph className="card-icon blue-icon" />
              </div>
              <div className="card-body">
                <span className="card-value">94.2%</span>
                <span className="card-trend positive">+3%~</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="summary-card">
              <div className="card-header">
                <span className="card-title">Revisões Pendentes</span>
                <MdDashboard className="card-icon orange-icon" />
              </div>
              <div className="card-body">
                <span className="card-value">24</span>
                <span className="card-subtext">Críticos: 5</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="summary-card">
              <div className="card-header">
                <span className="card-title">Tempo Médio</span>
                <MdCalendarToday className="card-icon blue-icon" />
              </div>
              <div className="card-body">
                <span className="card-value">1.4 hrs</span>
                <span className="card-trend negative">-15%↓</span>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Left Column */}
            <div className="grid-left">
              {/* Exames Pendentes */}
              <div className="content-panel">
                <div className="panel-header">
                  <h2>Exames Pendentes de Revisão</h2>
                  <a href="#todos" className="view-all-link">Ver Todos</a>
                </div>
                <div className="table-container">
                  <table className="pending-table">
                    <thead>
                      <tr>
                        <th>PACIENTE</th>
                        <th>TIPO DE EXAME</th>
                        <th>STATUS</th>
                        <th>CONFIANÇA DA IA</th>
                        <th>AÇÕES</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="patient-info">
                            <span className="patient-name">Sarah Jenkins</span>
                            <span className="patient-id">ID: #882193</span>
                          </div>
                        </td>
                        <td>Raio-X de Tórax (PA)</td>
                        <td><span className="status-badge critical">CRÍTICO</span></td>
                        <td>
                          <div className="confidence-wrapper">
                            <div className="confidence-bar"><div className="confidence-fill green" style={{width: '92%'}}></div></div>
                            <span className="confidence-value">92%</span>
                          </div>
                        </td>
                        <td><button className="btn-action">Revisar</button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="patient-info">
                            <span className="patient-name">Robert Miller</span>
                            <span className="patient-id">ID: #881204</span>
                          </div>
                        </td>
                        <td>RM de Crânio c/ Contraste</td>
                        <td><span className="status-badge moderate">MODERADO</span></td>
                        <td>
                          <div className="confidence-wrapper">
                            <div className="confidence-bar"><div className="confidence-fill orange" style={{width: '78%'}}></div></div>
                            <span className="confidence-value">78%</span>
                          </div>
                        </td>
                        <td><button className="btn-action">Revisar</button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="patient-info">
                            <span className="patient-name">Elena Rodriguez</span>
                            <span className="patient-id">ID: #883011</span>
                          </div>
                        </td>
                        <td>TC de Abdome/Pelve</td>
                        <td><span className="status-badge routine">ROTINA</span></td>
                        <td>
                          <div className="confidence-wrapper">
                            <div className="confidence-bar"><div className="confidence-fill green" style={{width: '96%'}}></div></div>
                            <span className="confidence-value">96%</span>
                          </div>
                        </td>
                        <td><button className="btn-action">Revisar</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Laudos Finalizados Recentemente */}
              <div className="content-panel mt-4">
                <div className="panel-header">
                  <h2>Laudos Finalizados Recentemente</h2>
                </div>
                <div className="recent-reports">
                  <div className="report-card">
                    <div className="report-icon-wrapper">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="report-icon">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5H8v1h1.5c.28 0 .5.22.5.5v1.5c0 .28-.22.5-.5.5H8v1H6.5v-6h3c.28 0 .5.22.5.5v1.5c0 .28-.22.5-.5.5zm4.5 1.5H12v-1h2c.28 0 .5-.22.5-.5V10c0-.28-.22-.5-.5-.5h-3v6h1.5v-2h1.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5zm4-3.5h-3v6h1.5v-2h1.5v-1.5h-1.5v-1h1.5V9.5z" fill="#0b57d0"/>
                        <path d="M8 10.5h1v1H8v-1zm4.5 0h1v2h-1v-2z" fill="#0b57d0"/>
                      </svg>
                    </div>
                    <div className="report-info">
                      <span className="report-title">Seguimento de Nó...</span>
                      <span className="report-meta">Assinado há 2h • Finalizado</span>
                    </div>
                    <MdKeyboardArrowRight className="report-arrow" />
                  </div>
                  
                  <div className="report-card">
                    <div className="report-icon-wrapper">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="report-icon">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5H8v1h1.5c.28 0 .5.22.5.5v1.5c0 .28-.22.5-.5.5H8v1H6.5v-6h3c.28 0 .5.22.5.5v1.5c0 .28-.22.5-.5.5zm4.5 1.5H12v-1h2c.28 0 .5-.22.5-.5V10c0-.28-.22-.5-.5-.5h-3v6h1.5v-2h1.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5zm4-3.5h-3v6h1.5v-2h1.5v-1.5h-1.5v-1h1.5V9.5z" fill="#0b57d0"/>
                        <path d="M8 10.5h1v1H8v-1zm4.5 0h1v2h-1v-2z" fill="#0b57d0"/>
                      </svg>
                    </div>
                    <div className="report-info">
                      <span className="report-title">Fratura de Mão - M...</span>
                      <span className="report-meta">Assinado há 4h • Finalizado</span>
                    </div>
                    <MdKeyboardArrowRight className="report-arrow" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="grid-right">
              {/* Ações Rápidas */}
              <div className="content-panel quick-actions-panel">
                <h2>Ações Rápidas</h2>
                <div className="quick-action-btns">
                  <button className="btn-action-large primary">
                    <MdAdd className="btn-icon" />
                    Novo Laudo
                  </button>
                  <button className="btn-action-large secondary">
                    <MdLibraryBooks className="btn-icon" />
                    Prontuários
                  </button>
                  <button className="btn-action-large secondary">
                    <MdLayers className="btn-icon" />
                    Modelos de Laudo
                  </button>
                </div>
              </div>

              {/* Estatísticas da IA */}
              <div className="content-panel stats-panel mt-4">
                <div className="stats-header">
                  <MdAutoAwesome className="stats-icon" />
                  <h2>Estatísticas do Assistente de IA</h2>
                </div>
                <div className="stats-body">
                  <div className="stat-item">
                    <div className="stat-label">
                      <span>PRECISÃO DO DIAGNÓSTICO</span>
                      <span className="stat-value-text">98.4%</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{width: '98.4%'}}></div></div>
                  </div>
                  
                  <div className="stat-item mt-3">
                    <div className="stat-label">
                      <span>TEMPO ECONOMIZADO (MÉDIA)</span>
                      <span className="stat-value-text">12 min/laudo</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{width: '100%'}}></div></div>
                  </div>
                  
                  <p className="stats-note">
                    *Sugestões de IA estão atualmente ativadas para todas as modalidades de Radiografia e TC.*
                  </p>
                </div>
              </div>

              {/* Modelos Favoritos (Placeholder based on design cutoff) */}
              <div className="content-panel mt-4">
                <h2>Modelos Favoritos</h2>
                <div className="favorites-list mt-3">
                  <p className="favorites-placeholder">Carregando modelos...</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
