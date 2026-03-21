import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  MdDashboard, 
  MdPeople, 
  MdDescription, 
  MdCalendarToday, 
  MdSettings,
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdCheckCircle
} from 'react-icons/md';
import './CadastroPaciente.css';
import { cadastrarPaciente } from '../../api/cadastroPaciente/apiCadastropaciente';

const CadastroPaciente = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    nomeCompleto: '', cpf: '', dataNascimento: '', genero: '',
    email: '', telefone: '', cep: '', logradouro: '',
    numero: '', complemento: '', bairro: '', cidade: '', estado: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const formatCPF = (value) => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1');
  const formatTelefone = (value) => value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{4})\d+?$/, '$1');
  const formatDataNascimento = (value) => value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\/\d{4})\d+?$/, '$1');

  const handleCadastroPaciente = async () => {
    const requiredFields = [
      'nomeCompleto', 'cpf', 'dataNascimento', 'genero', 'email', 
      'telefone', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'
    ];
    
    const errors = {};
    let hasError = false;

    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'Este campo é obrigatório';
        hasError = true;
      }
    });

    if (hasError) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      let dataToSend = null;
      if (formData.dataNascimento.length === 10) {
        const [dia, mes, ano] = formData.dataNascimento.split('/');
        dataToSend = new Date(Number(ano), Number(mes) - 1, Number(dia));
      }

    const payload = {
      nomeCompleto: formData.nomeCompleto,
      cpf: formData.cpf,
      dataNascimento: dataToSend,
      telefone: formData.telefone
    };

    await cadastrarPaciente(payload);
      setShowSuccessPopup(true);
    setFormData({ nomeCompleto: '', cpf: '', dataNascimento: '', telefone: '', genero: '', email: '', cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: ''   });
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
    }
  }

const closePopupAndNavigate = () => {
  setShowSuccessPopup(false);
  navigate('/pacientes');
};

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
            <div className="logo-text-group">
              <span className="logo-text">Tila Medical</span>
              <span className="logo-subtext">PLATAFORMA MÉDICA</span>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item" onClick={() => navigate('/dashboard')}>
              <MdDashboard className="nav-icon" />
              <span>Dashboard</span>
            </li>
            <li className="nav-item active" onClick={() => navigate('/pacientes')}>
              <MdPeople className="nav-icon" />
              <span>Pacientes</span>
            </li>
            <li className="nav-item">
              <MdDescription className="nav-icon" />
              <span>Exames</span>
            </li>
            <li className="nav-item">
              <MdCalendarToday className="nav-icon" />
              <span>Relatórios</span>
            </li>
            
            <li className="nav-category">SISTEMA</li>
            
            <li className="nav-item">
              <MdSettings className="nav-icon" />
              <span>Configurações</span>
            </li>
            <li className="nav-item logout" onClick={() => navigate('/login')}>
              <span className="nav-icon" style={{ transform: 'rotate(180deg)', display: 'inline-block', color: '#ff4d4f'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </span>
              <span style={{color: '#ff4d4f'}}>Sair</span>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile bg-gray-light">
            <div className="user-avatar">
              <img src="https://ui-avatars.com/api/?name=Ricardo+Silva&background=2C3E50&color=fff" alt="Dr. Ricardo Silva" />
            </div>
            <div className="user-info">
              <span className="user-name">Dr. Ricardo Silva</span>
              <span className="user-role">CRM/SP 123456</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main bg-light">
        {/* Top Header Placeholder / Mobile Toggle */}
        <header className="dashboard-header header-cadastro">
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Abrir Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
          </button>
        </header>

        {/* Cadastro Content */}
        <main className="cadastro-content">
          <div className="breadcrumbs">
            <Link to="/pacientes" className="breadcrumb-link">Pacientes</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Cadastrar Novo Paciente</span>
          </div>

          <div className="page-header">
            <h1>Cadastrar Novo Paciente</h1>
            <p className="page-subtitle">Insira as informações detalhadas para registrar um novo paciente no banco de dados da clínica.</p>
          </div>
          
          <form className="cadastro-form" onSubmit={(e) => e.preventDefault()}>
            <section className="form-section">
              <div className="section-header">
                <MdPerson className="section-icon feature-icon" />
                <h2>Dados Pessoais</h2>
              </div>
              <div className="form-grid">
                <div className="form-group col-span-2">
                  <label>Nome Completo *</label>
                  <input type="text" placeholder="Ex: Maria Oliveira" value={formData.nomeCompleto} onChange={(e) => setFormData({...formData, nomeCompleto: e.target.value})} className={formErrors.nomeCompleto ? 'input-error' : ''} />
                  {formErrors.nomeCompleto && <span className="error-text">{formErrors.nomeCompleto}</span>}
                </div>
                <div className="form-group">
                  <label>CPF *</label>
                  <input type="text" placeholder="000.000.000-00" value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: formatCPF(e.target.value)})} className={formErrors.cpf ? 'input-error' : ''} />
                  {formErrors.cpf && <span className="error-text">{formErrors.cpf}</span>}
                </div>
                <div className="form-group">
                  <label>Data de Nascimento *</label>
                  <div className="input-with-icon">
                    <input type="text" placeholder="DD/MM/AAAA" value={formData.dataNascimento} onChange={(e) => setFormData({...formData, dataNascimento: formatDataNascimento(e.target.value)})} className={formErrors.dataNascimento ? 'input-error' : ''} />
                    <MdCalendarToday className="inner-icon" />
                  </div>
                  {formErrors.dataNascimento && <span className="error-text">{formErrors.dataNascimento}</span>}
                </div>
                <div className="form-group">
                  <label>Gênero *</label>
                  <div className="select-wrapper">
                    <select value={formData.genero} onChange={(e) => setFormData({...formData, genero: e.target.value})} className={formErrors.genero ? 'input-error' : ''}>
                      <option value="" disabled>Selecione</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                      <option value="O">Outro</option>
                    </select>
                  </div>
                  {formErrors.genero && <span className="error-text">{formErrors.genero}</span>}
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="section-header">
                <MdPhone className="section-icon feature-icon" />
                <h2>Contato</h2>
              </div>
              <div className="form-grid">
                <div className="form-group col-span-2">
                  <label>E-mail *</label>
                  <input type="email" placeholder="paciente@exemplo.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={formErrors.email ? 'input-error' : ''} />
                  {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>
                <div className="form-group col-span-2">
                  <label>Telefone / WhatsApp *</label>
                  <input type="text" placeholder="(00) 00000-0000" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: formatTelefone(e.target.value)})} className={formErrors.telefone ? 'input-error' : ''} />
                  {formErrors.telefone && <span className="error-text">{formErrors.telefone}</span>}
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="section-header">
                <MdLocationOn className="section-icon feature-icon" />
                <h2>Endereço</h2>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>CEP *</label>
                  <input type="text" placeholder="00000-000" value={formData.cep} onChange={(e) => setFormData({...formData, cep: e.target.value})} className={formErrors.cep ? 'input-error' : ''} />
                  {formErrors.cep && <span className="error-text">{formErrors.cep}</span>}
                </div>
                <div className="form-group col-span-3">
                  <label>Logradouro *</label>
                  <input type="text" placeholder="Rua, Avenida, etc." value={formData.logradouro} onChange={(e) => setFormData({...formData, logradouro: e.target.value})} className={formErrors.logradouro ? 'input-error' : ''} />
                  {formErrors.logradouro && <span className="error-text">{formErrors.logradouro}</span>}
                </div>
                <div className="form-group">
                  <label>Número *</label>
                  <input type="text" placeholder="123" value={formData.numero} onChange={(e) => setFormData({...formData, numero: e.target.value})} className={formErrors.numero ? 'input-error' : ''} />
                  {formErrors.numero && <span className="error-text">{formErrors.numero}</span>}
                </div>
                <div className="form-group col-span-2">
                  <label>Complemento</label>
                  <input type="text" placeholder="Apto, Bloco, etc." value={formData.complemento} onChange={(e) => setFormData({...formData, complemento: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Bairro *</label>
                  <input type="text" placeholder="Nome do bairro" value={formData.bairro} onChange={(e) => setFormData({...formData, bairro: e.target.value})} className={formErrors.bairro ? 'input-error' : ''} />
                  {formErrors.bairro && <span className="error-text">{formErrors.bairro}</span>}
                </div>
                <div className="form-group col-span-2">
                  <label>Cidade *</label>
                  <input type="text" placeholder="Nome da cidade" value={formData.cidade} onChange={(e) => setFormData({...formData, cidade: e.target.value})} className={formErrors.cidade ? 'input-error' : ''} />
                  {formErrors.cidade && <span className="error-text">{formErrors.cidade}</span>}
                </div>
                <div className="form-group">
                  <label>Estado *</label>
                  <div className="select-wrapper">
                    <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})} className={formErrors.estado ? 'input-error' : ''}>
                      <option value="" disabled>UF</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </select>
                  </div>
                  {formErrors.estado && <span className="error-text">{formErrors.estado}</span>}
                </div>
              </div>
            </section>

            <div className="form-actions">
              <button type="button" className="btn-cancelar" onClick={() => navigate('/pacientes')}>Cancelar</button>
              <button type="submit" className="btn-cadastrar" onClick={handleCadastroPaciente}>Cadastrar Paciente</button>
            </div>
          </form>
        </main>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <MdCheckCircle className="popup-icon" />
            <h2>Cadastro Realizado!</h2>
            <p>O paciente foi cadastrado com sucesso no sistema.</p>
            <button className="btn-popup-ok" onClick={closePopupAndNavigate}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastroPaciente;
