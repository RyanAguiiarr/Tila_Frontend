import React, { useState } from 'react';
import { 
  MdDashboard, 
  MdPeople, 
  MdDescription, 
  MdCalendarToday, 
  MdSettings,
  MdSearch,
  MdNotifications,
  MdAdd,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight
} from 'react-icons/md';
import './Pacientes.css';

const Pacientes = ({ onNavigate }) => {
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
            <li className="nav-item" onClick={() => onNavigate('dashboard')}>
              <MdDashboard className="nav-icon" />
              <span>Dashboard</span>
            </li>
            <li className="nav-item active">
              <MdPeople className="nav-icon" />
              <span>Pacientes</span>
            </li>
            <li className="nav-item">
              <MdDescription className="nav-icon" />
              <span>Exames</span>
            </li>
            <li className="nav-item">
              <MdCalendarToday className="nav-icon" />
              <span>Consultas</span>
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
              <span className="user-role">Cardiologista</span>
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
              <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
            </button>
            <div className="search-bar search-bar-pacientes">
              <MdSearch className="search-icon" />
              <input type="text" placeholder="Buscar por nome do paciente ou CPF..." />
            </div>
          </div>
          <div className="header-actions">
            <div className="notification-bell">
              <MdNotifications className="bell-icon" />
              <span className="notification-dot"></span>
            </div>
            <button className="btn-primary">
              <MdAdd className="btn-icon" />
              <span className="btn-text">Adicionar Novo Paciente</span>
            </button>
          </div>
        </header>

        {/* Pacientes Content */}
        <main className="dashboard-content">
          <div className="page-title">
            <h1>Prontuários de Pacientes</h1>
            <p>Gerencie, acompanhe e inicie laudos clínicos para todos os pacientes registrados.</p>
          </div>
          
          {/* Summary Cards */}
          <div className="summary-cards">
            {/* Card 1 */}
            <div className="summary-card">
              <div className="card-header pt-0">
                <span className="card-title text-dark-gray">Total de Pacientes</span>
              </div>
              <div className="card-body-pacientes">
                <span className="card-value">1.284</span>
                <span className="card-trend positive">~ +4% este mês</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="summary-card">
              <div className="card-header pt-0">
                <span className="card-title text-dark-gray">Exames Recentes</span>
              </div>
              <div className="card-body-pacientes">
                <span className="card-value">42</span>
                <span className="card-subtext-light">Últimas 24 horas</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="summary-card">
              <div className="card-header pt-0">
                <span className="card-title text-dark-gray">Em Estado Crítico</span>
              </div>
              <div className="card-body-pacientes">
                <span className="card-value text-red">8</span>
                <span className="card-subtext-light text-red">Necessita revisão imediata</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="summary-card">
              <div className="card-header pt-0">
                <span className="card-title text-dark-gray">Laudos Pendentes</span>
              </div>
              <div className="card-body-pacientes">
                <span className="card-value text-blue">12</span>
                <span className="card-subtext-light text-blue">Atribuídos a você</span>
              </div>
            </div>
          </div>

          <div className="content-panel full-width-panel">
            <div className="table-container">
              <table className="pacientes-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Idade</th>
                    <th>Exame Recente</th>
                    <th>Status</th>
                    <th className="text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td>
                      <div className="patient-name-col">
                        <div className="avatar-initials bg-light-blue text-blue">AS</div>
                        <span className="font-bold text-dark">Alice Silva</span>
                      </div>
                    </td>
                    <td className="text-gray">123.456.789-00</td>
                    <td className="text-gray">28</td>
                    <td>
                      <div className="exam-info">
                        <span className="font-bold text-dark">Exame de Sangue</span>
                        <span className="text-small text-gray">10/10/2023</span>
                      </div>
                    </td>
                    <td><span className="badge-pill bg-light-green text-green">Estável</span></td>
                    <td className="actions-col">
                      <button className="btn-outline">Ver Prontuário</button>
                      <button className="btn-solid-blue">Iniciar Laudo</button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td>
                      <div className="patient-name-col">
                        <div className="avatar-initials bg-light-gray text-gray-dark">BC</div>
                        <span className="font-bold text-dark">Bruno Costa</span>
                      </div>
                    </td>
                    <td className="text-gray">987.654.321-11</td>
                    <td className="text-gray">45</td>
                    <td>
                      <div className="exam-info">
                        <span className="font-bold text-dark">Raio-X de Tórax</span>
                        <span className="text-small text-gray">15/10/2023</span>
                      </div>
                    </td>
                    <td><span className="badge-pill bg-light-red text-red">Crítico</span></td>
                    <td className="actions-col">
                      <button className="btn-outline">Ver Prontuário</button>
                      <button className="btn-solid-blue">Iniciar Laudo</button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td>
                      <div className="patient-name-col">
                        <div className="avatar-initials bg-light-purple text-purple">CD</div>
                        <span className="font-bold text-dark">Carla Dias</span>
                      </div>
                    </td>
                    <td className="text-gray">456.789.123-22</td>
                    <td className="text-gray">32</td>
                    <td>
                      <div className="exam-info">
                        <span className="font-bold text-dark">Ressonância Magnética de Crânio</span>
                        <span className="text-small text-gray">02/11/2023</span>
                      </div>
                    </td>
                    <td><span className="badge-pill bg-light-blue text-blue">Em Recuperação</span></td>
                    <td className="actions-col">
                      <button className="btn-outline">Ver Prontuário</button>
                      <button className="btn-solid-blue">Iniciar Laudo</button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr>
                    <td>
                      <div className="patient-name-col">
                        <div className="avatar-initials bg-light-gray text-gray-dark">DM</div>
                        <span className="font-bold text-dark">Daniel Martins</span>
                      </div>
                    </td>
                    <td className="text-gray">332.112.556-88</td>
                    <td className="text-gray">54</td>
                    <td>
                      <div className="exam-info">
                        <span className="font-bold text-dark">Colesterol</span>
                        <span className="text-small text-gray">05/11/2023</span>
                      </div>
                    </td>
                    <td><span className="badge-pill bg-light-gray text-gray-dark">Aguardando</span></td>
                    <td className="actions-col">
                      <button className="btn-outline">Ver Prontuário</button>
                      <button className="btn-solid-blue">Iniciar Laudo</button>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr>
                    <td>
                      <div className="patient-name-col">
                        <div className="avatar-initials bg-light-yellow text-yellow-dark">EO</div>
                        <span className="font-bold text-dark">Elena Oliveira</span>
                      </div>
                    </td>
                    <td className="text-gray">778.334.009-12</td>
                    <td className="text-gray">19</td>
                    <td>
                      <div className="exam-info">
                        <span className="font-bold text-dark">Ultrassom</span>
                        <span className="text-small text-gray">08/11/2023</span>
                      </div>
                    </td>
                    <td><span className="badge-pill bg-light-green text-green">Estável</span></td>
                    <td className="actions-col">
                      <button className="btn-outline">Ver Prontuário</button>
                      <button className="btn-solid-blue">Iniciar Laudo</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              {/* Pagination */}
              <div className="pagination-wrapper">
                <span className="pagination-info">Exibindo 1 a 5 de 1.284 resultados</span>
                <div className="pagination-controls">
                  <button className="page-btn"><MdKeyboardArrowLeft /></button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">3</button>
                  <span className="page-dots">...</span>
                  <button className="page-btn">257</button>
                  <button className="page-btn"><MdKeyboardArrowRight /></button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pacientes;
