import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { CadastroPacienteComponent } from './pages/cadastro-paciente/cadastro-paciente.component';
import { ProntuarioComponent } from './pages/prontuario/prontuario.component';
import { LaudoIaComponent } from './pages/laudo-ia/laudo-ia.component';
import { LogsComponent } from './pages/logs/logs.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'pacientes', 
    component: PacientesComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'pacientes/novo', 
    component: CadastroPacienteComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'pacientes/:id', 
    component: ProntuarioComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'laudo', 
    component: LaudoIaComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'logs', 
    component: LogsComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' }
];
