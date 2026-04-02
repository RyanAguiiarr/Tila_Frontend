import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../core/services/store/auth.store';
import { PacienteApiService } from '../../core/services/api/paciente-api.service';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  private pacienteApi = inject(PacienteApiService);

  user = this.authStore.user;
  isSidebarOpen = false;

  formData: any = {
    nomeCompleto: '', cpf: '', dataNascimento: '', genero: '',
    email: '', telefone: '', cep: '', logradouro: '',
    numero: '', complemento: '', bairro: '', cidade: '', estado: ''
  };

  formErrors: any = {};
  showSuccessPopup = false;

  setIsSidebarOpen(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  formatCPF(value: string) {
    return value.replace(/\D/g, '')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
  }

  formatTelefone(value: string) {
    return value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1');
  }

  formatDataNascimento(value: string) {
    return value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\/\d{4})\d+?$/, '$1');
  }

  onCPFChange(value: string) {
    this.formData.cpf = this.formatCPF(value);
  }

  onTelefoneChange(value: string) {
    this.formData.telefone = this.formatTelefone(value);
  }

  onDataNascimentoChange(value: string) {
    this.formData.dataNascimento = this.formatDataNascimento(value);
  }

  handleSubmit(e: Event) {
    e.preventDefault();
  }

  async handleCadastroPaciente() {
    const requiredFields = [
      'nomeCompleto', 'cpf', 'dataNascimento', 'genero', 'email', 
      'telefone', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'
    ];
    
    const errors: any = {};
    let hasError = false;

    requiredFields.forEach(field => {
      if (!this.formData[field]) {
        errors[field] = 'Este campo é obrigatório';
        hasError = true;
      }
    });

    if (hasError) {
      this.formErrors = errors;
      return;
    }

    this.formErrors = {};

    try {
      let dataToSend: Date | null = null;
      if (this.formData.dataNascimento.length === 10) {
        const [dia, mes, ano] = this.formData.dataNascimento.split('/');
        dataToSend = new Date(Number(ano), Number(mes) - 1, Number(dia));
      }

      const payload: any = {
        nomeCompleto: this.formData.nomeCompleto,
        cpf: this.formData.cpf,
        dataNascimento: dataToSend,
        telefone: this.formData.telefone,
        // others can be added if backend supports
      };

      await this.pacienteApi.cadastrarPaciente(payload).toPromise();
      this.showSuccessPopup = true;
      
      this.formData = { 
        nomeCompleto: '', cpf: '', dataNascimento: '', genero: '', 
        email: '', telefone: '', cep: '', logradouro: '', numero: '', 
        complemento: '', bairro: '', cidade: '', estado: '' 
      };
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
    }
  }

  closePopupAndNavigate() {
    this.showSuccessPopup = false;
    this.router.navigate(['/pacientes']);
  }
}
