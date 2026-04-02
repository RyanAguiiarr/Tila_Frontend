import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecurityBadgesComponent } from '../../components/security-badges/security-badges.component';
import { AuthApiService } from '../../core/services/api/auth-api.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, SecurityBadgesComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  private router = inject(Router);
  private authApi = inject(AuthApiService);

  showPassword = false;
  
  nome = '';
  crm = '';
  especialidade = '';
  email = '';
  senha = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleSubmit(e: Event) {
    e.preventDefault();
  }

  async handleCadastro(e: Event) {
    e.preventDefault();
    if (!this.nome || !this.email || !this.senha || !this.crm || !this.especialidade) return;

    const req = {
      nome: this.nome,
      crm: this.crm,
      especialidade: this.especialidade,
      email: this.email,
      senha: this.senha
    };

    try {
      await this.authApi.cadastrar(req).toPromise();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
