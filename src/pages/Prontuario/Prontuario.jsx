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
  MdEdit,
  MdAssignment,
  MdHistory,
  MdPhotoLibrary,
  MdVisibility,
  MdVisibilityOff
} from 'react-icons/md';
import './Prontuario.css';
import { useAuthStore } from '../../store/useAuthStore';

const Prontuario = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('resumo');

  // We keep auth usage minimal since its just visual
  const user = useAuthStore((state) => state.user);

  return (
    <div className="dashboard-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Sidebar - Similar to previous implementations */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
              <path d="M12 2L2 12l10 10 10-10L12 2z" fill="currentColor" />
              <path d="M12 2L2 12l10 10V2z" fill="#0b57d0" />
              <path d="M12 2l10 10-10 10V2z" fill="#1a73e8" />
            </svg>
            <div className="logo-text-wrapper">
              <span className="logo-text">Tila Saúde</span>
              <span className="portal-subtitle">PORTAL DO PROFISSIONAL</span>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item" onClick={() => navigate('/dashboard')}><MdDashboard className="nav-icon" /><span>Dashboard</span></li>
            <li className="nav-item active hoverable" onClick={() => navigate('/pacientes')}><MdPeople className="nav-icon active-icon-blue" /><span className="active-text-blue font-bold">Pacientes</span></li>
            <li className="nav-item hoverable"><MdCalendarToday className="nav-icon" /><span>Agendamentos</span></li>
            <li className="nav-item hoverable"><MdDescription className="nav-icon" /><span>Laudos</span></li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="nav-item settings-item hoverable"><MdSettings className="nav-icon" /><span>Configurações</span></div>
          <div className="nav-item logout-item text-red hoverable"><svg viewBox="0 0 24 24" width="24" height="24" className="nav-icon"><path fill="currentColor" d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg><span>Sair</span></div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main bg-light-gray-app">
        {/* Top Header */}
        <header className="dashboard-header bg-white border-bottom-light">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)} aria-label="Abrir Menu">
              <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
            </button>
            <div className="search-bar search-bar-prontuario fill-gray">
              <MdSearch className="search-icon" />
              <input type="text" placeholder="Buscar pacientes..." />
            </div>
          </div>
          <div className="header-actions">
            <div className="notification-bell action-btn-top"><MdNotifications className="bell-icon text-gray-dark" /></div>
            <div className="user-profile-top action-btn-top rounded-full bg-light-gray flex-center">
              <svg viewBox="0 0 24 24" width="20" height="20" className="text-gray-dark"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            </div>
            <div className="user-avatar-top overflow-hidden rounded-full width-36">
              <img src="https://images.unsplash.com/photo-1612349317150-e410f624c4a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80" alt="Doctor" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          </div>
        </header>

        {/* Prontuario Content */}
        <main className="dashboard-content prontuario-container pt-lg">
          
          {/* Patient Header Card */}
          <div className="card patient-header-card shadow-sm border-radius-lg mb-lg">
            <div className="patient-header-content p-lg flex-row space-between align-center">
              
              <div className="patient-info-left flex-row align-center gap-lg">
                <div className="patient-avatar-large shadow-sm">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Sarah Jenkins" />
                </div>
                
                <div className="patient-info-main flex-col gap-xs">
                  <div className="patient-name-row flex-row align-center gap-sm mb-xs">
                    <h1 className="patient-name m-0 text-xl font-bold">Sarah Jenkins</h1>
                    <span className="status-pill status-estavel">ESTÁVEL</span>
                  </div>
                  
                  <div className="patient-details-row flex-row align-center gap-xs text-gray text-sm font-medium mb-xs">
                    <span className="detail-item">ID: #882931</span>
                    <span className="detail-dot font-black">•</span>
                    <span className="detail-item">28 anos</span>
                    <span className="detail-dot font-black">•</span>
                    <span className="detail-item">Feminino</span>
                  </div>
                  
                  <div className="patient-update-row flex-row align-center gap-xs text-light-gray text-xs font-medium">
                    <MdHistory className="update-icon" />
                    <span className="update-text">Última atualização: 12 Out 2023 às 14:30</span>
                  </div>
                </div>
              </div>
              
              <div className="patient-actions flex-row gap-sm">
                <button className="btn-outline-gray btn-with-icon font-bold text-sm">
                  <MdEdit className="icon-sm" />
                  Editar Cadastro
                </button>
                <button className="btn-solid-blue btn-with-icon font-bold text-sm">
                  <MdAdd className="icon-sm" />
                  Novo Laudo
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="prontuario-tabs flex-row border-bottom-light mb-lg">
            <button className={`tab-item ${activeTab === 'resumo' ? 'active' : ''}`} onClick={() => setActiveTab('resumo')}>Resumo</button>
            <button className={`tab-item ${activeTab === 'historico' ? 'active' : ''}`} onClick={() => setActiveTab('historico')}>Histórico</button>
            <button className={`tab-item ${activeTab === 'notas' ? 'active' : ''}`} onClick={() => setActiveTab('notas')}>Notas Clínicas</button>
            <button className={`tab-item ${activeTab === 'imagens' ? 'active' : ''}`} onClick={() => setActiveTab('imagens')}>Imagens</button>
          </div>

          {/* Resumo Tab Content */}
          {activeTab === 'resumo' && (
            <div className="prontuario-grid">
              
              {/* Left Column */}
              <div className="grid-left-col flex-col gap-lg">
                
                {/* Resumo do Paciente Card */}
                <div className="card shadow-sm border-radius-lg bg-white">
                  <div className="card-header pb-0 border-none pt-lg px-lg">
                    <div className="card-title-with-icon flex-row align-center gap-sm">
                      <MdAssignment className="title-icon text-blue text-lg" />
                      <h2 className="text-md font-bold m-0 text-dark">Resumo do Paciente</h2>
                    </div>
                  </div>
                  <div className="card-content p-lg">
                    <div className="info-grid-4 flex-row space-between gap-md border-top-light pt-md mt-sm">
                      <div className="info-block flex-col gap-xs">
                        <span className="info-label text-xs font-bold text-light-gray ls-wide">TIPO SANGUÍNEO</span>
                        <span className="info-value text-lg font-bold text-dark">O Rh+</span>
                      </div>
                      <div className="info-block flex-col gap-xs">
                        <span className="info-label text-xs font-bold text-light-gray ls-wide">ALERGIAS</span>
                        <span className="info-value text-md font-bold text-red">Penicilina</span>
                      </div>
                      <div className="info-block flex-col gap-xs">
                        <span className="info-label text-xs font-bold text-light-gray ls-wide">MÉDICO RESPONSÁVEL</span>
                        <span className="info-value text-md font-bold text-dark">Dr. Aris</span>
                      </div>
                      <div className="info-block flex-col gap-xs">
                        <span className="info-label text-xs font-bold text-light-gray ls-wide">PESO / ALTURA</span>
                        <span className="info-value text-md font-bold text-dark">68kg / 1.72m</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Histórico de Laudos Card */}
                <div className="card shadow-sm border-radius-lg bg-white">
                  <div className="card-header border-none flex-row space-between align-center pt-lg px-lg pb-sm">
                    <div className="card-title-with-icon flex-row align-center gap-sm">
                      <MdHistory className="title-icon text-blue text-lg" />
                      <h2 className="text-md font-bold m-0 text-dark">Histórico de Laudos</h2>
                    </div>
                    <button className="link-button text-blue text-sm font-bold bg-transparent border-none cursor-pointer hover-underline">Ver todos</button>
                  </div>
                  <div className="card-content px-lg pb-lg pt-0">
                    <div className="table-wrapper">
                      <table className="history-table w-100 border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left text-xs font-bold text-light-gray pb-sm pt-sm uppercase border-bottom-light">EXAME</th>
                            <th className="text-left text-xs font-bold text-light-gray pb-sm pt-sm uppercase border-bottom-light">DATA</th>
                            <th className="text-left text-xs font-bold text-light-gray pb-sm pt-sm uppercase border-bottom-light">STATUS</th>
                            <th className="text-right text-xs font-bold text-light-gray pb-sm pt-sm uppercase border-bottom-light w-100-px">AÇÃO</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-md border-bottom-light">
                              <div className="exam-type-row flex-row align-center gap-md">
                                <div className="exam-icon-box bg-light-blue text-blue flex-center rounded width-32 height-32">
                                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                                </div>
                                <span className="font-bold text-dark text-sm line-height-tight">Resonância Magnética<br/><span className="text-normal text-gray">(Crânio)</span></span>
                              </div>
                            </td>
                            <td className="py-md border-bottom-light text-gray text-sm line-height-tight">10 Out<br/>2023</td>
                            <td className="py-md border-bottom-light"><span className="status-pill-bg text-blue bg-light-blue text-xs font-bold rounded-full px-sm py-xs">Concluído</span></td>
                            <td className="py-md border-bottom-light text-right">
                              <button className="action-btn text-blue font-bold flex-row align-center justify-end w-100 gap-xs bg-transparent border-none cursor-pointer p-0 text-sm">
                                <MdVisibility className="text-md" />
                                Visualizar
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-md border-bottom-light">
                              <div className="exam-type-row flex-row align-center gap-md">
                                <div className="exam-icon-box bg-light-blue text-blue flex-center rounded width-32 height-32">
                                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 13c-2.76 0-5-2.24-5-5s5-9 5-9 5 6.24 5 9-2.24 5-5 5z"/></svg>
                                </div>
                                <span className="font-bold text-dark text-sm">Hemograma Completo</span>
                              </div>
                            </td>
                            <td className="py-md border-bottom-light text-gray text-sm line-height-tight">05 Set<br/>2023</td>
                            <td className="py-md border-bottom-light"><span className="status-pill-bg text-yellow-dark bg-light-yellow text-xs font-bold rounded-full px-sm py-xs">Em análise</span></td>
                            <td className="py-md border-bottom-light text-right">
                              <button className="action-btn text-light-gray font-bold flex-row align-center justify-end w-100 gap-xs bg-transparent border-none cursor-default p-0 text-sm">
                                <MdVisibilityOff className="text-md" />
                                Indisponível
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-md border-bottom-none">
                              <div className="exam-type-row flex-row align-center gap-md">
                                <div className="exam-icon-box bg-light-blue text-blue flex-center rounded width-32 height-32">
                                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M22 6h-2.4l-1.4-2.8c-.3-.6-.9-1-1.6-1H7.4c-.7 0-1.3.4-1.6 1L4.4 6H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM12 19c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/><path fill="currentColor" d="M12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/></svg>
                                </div>
                                <span className="font-bold text-dark text-sm">Eletrocardiograma</span>
                              </div>
                            </td>
                            <td className="py-md border-bottom-none text-gray text-sm line-height-tight">22 Ago<br/>2023</td>
                            <td className="py-md border-bottom-none"><span className="status-pill-bg text-blue bg-light-blue text-xs font-bold rounded-full px-sm py-xs">Concluído</span></td>
                            <td className="py-md border-bottom-none text-right">
                              <button className="action-btn text-blue font-bold flex-row align-center justify-end w-100 gap-xs bg-transparent border-none cursor-pointer p-0 text-sm">
                                <MdVisibility className="text-md" />
                                Visualizar
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="grid-right-col flex-col gap-lg">
                
                {/* Notas Clínicas Card */}
                <div className="card shadow-sm border-radius-lg bg-white h-full-stretch">
                  <div className="card-header border-none pt-lg px-lg pb-md">
                    <div className="card-title-with-icon flex-row align-center gap-sm">
                      <MdAssignment className="title-icon text-blue text-lg flex-shrink-0" />
                      <h2 className="text-md font-bold m-0 text-dark">Notas Clínicas</h2>
                    </div>
                  </div>
                  <div className="card-content px-lg pb-lg pt-0 flex-col space-between h-minus-header">
                    <div className="timeline-wrapper mb-lg">
                      
                      {/* Timeline Item 1 */}
                      <div className="timeline-item flex-row gap-md position-relative">
                        <div className="timeline-line"></div>
                        <div className="timeline-dot-container mt-sm z-index-1">
                          <div className="timeline-dot active-dot bg-blue rounded-full width-10 border-white-thick"></div>
                        </div>
                        <div className="timeline-content pb-lg w-100">
                          <div className="timeline-header flex-row align-center gap-sm mb-xs">
                            <span className="timeline-date text-xs font-bold text-light-gray">12 OUT 2023</span>
                            <span className="timeline-badge bg-light-blue text-blue text-xs-micro font-bold rounded px-test py-test">ROTINA</span>
                          </div>
                          <p className="timeline-text text-sm text-dark font-medium m-0 mb-xs pr-md line-height-normal">Paciente relata melhora nas dores de cabeça.</p>
                          <span className="timeline-author text-xs text-light-gray italic">Por: Dra. Ana Costa</span>
                        </div>
                      </div>
                      
                      {/* Timeline Item 2 */}
                      <div className="timeline-item flex-row gap-md position-relative">
                        <div className="timeline-dot-container mt-sm z-index-1">
                          <div className="timeline-dot inactive-dot bg-light-gray-solid rounded-full width-10 border-white-thick"></div>
                        </div>
                        <div className="timeline-content w-100">
                          <div className="timeline-header flex-row align-center gap-sm mb-xs">
                            <span className="timeline-date text-xs font-bold text-light-gray">28 SET 2023</span>
                          </div>
                          <p className="timeline-text text-sm text-gray m-0 mb-xs pr-md line-height-normal">Prescrição ajustada para monitoramento de pressão arterial semanal.</p>
                          <span className="timeline-author text-xs text-light-gray italic">Por: Dr. Aris</span>
                        </div>
                      </div>

                    </div>
                    
                    <button className="btn-outline-full w-100 py-sm rounded border-light text-dark font-bold bg-transparent cursor-pointer hover-bg-light transition-all">Adicionar Nota</button>
                  </div>
                </div>

                {/* Imagens Recentes Card */}
                <div className="card shadow-sm border-radius-lg bg-white">
                  <div className="card-header border-none pt-lg px-lg pb-md">
                    <div className="card-title-with-icon flex-row align-center gap-sm">
                      <MdPhotoLibrary className="title-icon text-blue text-lg flex-shrink-0" />
                      <h2 className="text-md font-bold m-0 text-dark">Imagens Recentes</h2>
                    </div>
                  </div>
                  <div className="card-content px-lg pb-lg pt-0">
                    <div className="images-grid">
                      <div className="img-box rounded overflow-hidden cursor-pointer hover-opacity">
                        <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=200&q=80" alt="MRI" className="w-100 h-100 object-cover" />
                      </div>
                      <div className="img-box rounded overflow-hidden cursor-pointer hover-opacity">
                        <img src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f51?auto=format&fit=crop&w=200&q=80" alt="X-Ray" className="w-100 h-100 object-cover" />
                      </div>
                      <div className="img-box rounded overflow-hidden cursor-pointer hover-opacity">
                        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=200&q=80" alt="Scan" className="w-100 h-100 object-cover" />
                      </div>
                      <div className="img-box rounded overflow-hidden bg-light-gray-app flex-center flex-col text-blue cursor-pointer hover-bg-light-blue transition-all border-dashed-blue">
                        <div className="more-content flex-center flex-col gap-xs">
                          <MdPhotoLibrary className="icon-more text-lg" />
                          <span className="text-xs font-bold uppercase">Mais</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
};

export default Prontuario;
