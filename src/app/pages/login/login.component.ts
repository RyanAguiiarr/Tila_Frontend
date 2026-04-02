import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecurityBadgesComponent } from '../../components/security-badges/security-badges.component';
import { AuthApiService } from '../../core/services/api/auth-api.service';
import { AuthStore } from '../../core/services/store/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, SecurityBadgesComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private authApi = inject(AuthApiService);
  private authStore = inject(AuthStore);

  showPassword = false;
  warningMessage = '';
  
  email = '';
  senha = '';

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['message']) {
      this.warningMessage = navigation.extras.state['message'];
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleSubmit(e: Event) {
    e.preventDefault();
  }

  async handlelogin(e: Event) {
    e.preventDefault();
    if (!this.email || !this.senha) return;

    try {
      const response = await this.authApi.login({ email: this.email, senha: this.senha }).toPromise();
      console.log("retorno da api", response);
      await this.authStore.fetchProfile();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
      this.warningMessage = 'Erro ao realizar login. Verifique suas credenciais.';
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
