import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { buscarTodosPacientes } from '../../api/paciente/apiPaciente';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const Pacientes = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [pacientes, setPacientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(pacientes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPacientes = pacientes.slice(indexOfFirstItem, indexOfLastItem);

  const user = useAuthStore((state) => state.user);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 1) return [1];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const calcularIdade = (data) => {
    if (!data) return '--';
    let d;
    if (Array.isArray(data)) d = new Date(data[0], data[1] - 1, data[2]);
    else if (typeof data === 'string' && data.includes('-')) d = new Date(data.split('T')[0]);
    else if (typeof data === 'string' && data.includes('/')) d = new Date(data.split('/').reverse().join('-'));
    else d = new Date(data);

    if (isNaN(d.getTime())) return '--';
    const hj = new Date();
    let id = hj.getFullYear() - d.getFullYear();
    if (hj.getMonth() < d.getMonth() || (hj.getMonth() === d.getMonth() && hj.getDate() < d.getDate())) id--;
    return id;
  };

  const obterIniciais = (nome = '') => {
    const p = nome.trim().split(' ').filter(Boolean);
    return p.length > 1 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : p[0]?.substring(0, 2).toUpperCase() || '?';
  };

  const getAvatarClasses = (index) => {
    const colors = ['blue', 'purple', 'green', 'red', 'yellow-dark', 'gray-dark'];
    const color = colors[index % colors.length];
    return `avatar-initials bg-light-${color.replace('-dark', '')} text-${color}`;
  };

  const buscarPacientes = async () => {
    try { setPacientes(await buscarTodosPacientes()); }
    catch (e) { console.error('Erro ao buscar pacientes:', e); }
  };

  const totalExames = () => {
    let total = 0;
    for (let i = 0; i < pacientes.length; i++) {
      total += pacientes[i].exames.length;
    }
    return total;
  }

  useEffect(() => { buscarPacientes(); }, []);

  return (
    <div className="dashboard-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

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
            <li className="nav-item" onClick={() => navigate('/dashboard')}>
              <MdDashboard className="nav-icon" />
              <span>Painel</span>
            </li>
            <li className="nav-item active" onClick={() => navigate('/pacientes')}>
              <MdPeople className="nav-icon" />
              <span>Pacientes</span>
            </li>
            <li className="nav-item">
              <MdDescription className="nav-icon" />
              <span>Laudos</span>
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
              <span className="user-name">{user?.nomeCompleto}</span>
              <span className="user-role">{user?.especialidade}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)} aria-label="Abrir Menu">
              <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
            </button>
            <div className="search-bar search-bar-pacientes">
              <MdSearch className="search-icon" />
              <input type="text" placeholder="Buscar por nome do paciente ou CPF..." />
            </div>
          </div>
          <div className="header-actions">
            <div className="notification-bell"><MdNotifications className="bell-icon" /><span className="notification-dot"></span></div>
            <button className="btn-primary" onClick={() => navigate("/pacientes/novo")}>
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
            <div className="summary-card">
              <div className="card-header pt-0"><span className="card-title text-dark-gray">Total de Pacientes</span></div>
              <div className="card-body-pacientes"><span className="card-value">{pacientes.length}</span><span className="card-trend positive">Totais Registrados</span></div>
            </div>
            <div className="summary-card">
              <div className="card-header pt-0"><span className="card-title text-dark-gray">Exames Recentes</span></div>
              <div className="card-body-pacientes"><span className="card-value">{totalExames()}</span><span className="card-subtext-light">Últimas 24 horas</span></div>
            </div>
            <div className="summary-card">
              <div className="card-header pt-0"><span className="card-title text-dark-gray">Laudos Pendentes</span></div>
              <div className="card-body-pacientes"><span className="card-value text-blue">0</span><span className="card-subtext-light text-blue">Atribuídos a você</span></div>
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
                    <th className="text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPacientes.map((paciente, index) => (
                    <tr key={index}>
                      <td>
                        <div className="patient-name-col">
                          <div className={getAvatarClasses(index)}>
                            {obterIniciais(paciente.nomeCompleto)}
                          </div>
                          <span className="font-bold text-dark">{paciente.nomeCompleto}</span>
                        </div>
                      </td>
                      <td className="text-gray">{paciente.cpf}</td>
                      <td className="text-gray">{calcularIdade(paciente.dataNascimento)}</td>
                      <td>
                        <div className="exam-info">
                          <span className="font-bold text-dark">Exame de Rotina</span>
                          <span className="text-small text-gray">15/10/2023</span>
                        </div>
                      </td>
                      <td className="actions-col">
                        <button className="btn-outline" onClick={() => navigate(`/pacientes/${paciente.id}`)}>Ver Prontuário</button>
                        <button className="btn-solid-blue">Iniciar Laudo</button>
                      </td>
                    </tr>
                  ))}
                  {pacientes.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-gray" style={{ padding: '3rem' }}>
                        Nenhum paciente cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {pacientes.length > 0 && (
                <div className="pagination-wrapper">
                  <span className="pagination-info">
                    Exibindo {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, pacientes.length)} de {pacientes.length} resultados
                  </span>
                  <div className="pagination-controls">
                    <button
                      className="page-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <MdKeyboardArrowLeft />
                    </button>

                    {getPageNumbers().map((num, i) => (
                      num === '...' ? (
                        <span key={`dots-${i}`} className="page-dots">...</span>
                      ) : (
                        <button
                          key={`page-${num}`}
                          className={`page-btn ${currentPage === num ? 'active' : ''}`}
                          onClick={() => handlePageChange(num)}
                        >
                          {num}
                        </button>
                      )
                    ))}

                    <button
                      className="page-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <MdKeyboardArrowRight />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pacientes;
