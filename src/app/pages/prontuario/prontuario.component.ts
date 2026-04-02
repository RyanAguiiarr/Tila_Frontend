import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthStore } from '../../core/services/store/auth.store';
import { MedicalStore } from '../../core/services/store/medical.store';
import { PacienteApiService, Paciente } from '../../core/services/api/paciente-api.service';

@Component({
  selector: 'app-prontuario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.css']
})
export class ProntuarioComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authStore = inject(AuthStore);
  private medicalStore = inject(MedicalStore);
  private pacienteApi = inject(PacienteApiService);

  user = this.authStore.user;
  isSidebarOpen = false;
  activeTab = 'resumo';
  paciente: Paciente | null = null;
  id: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.buscarPaciente(this.id);
      }
    });
  }

  setIsSidebarOpen(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  async buscarPaciente(pacienteId: string) {
    try {
      this.pacienteApi.buscarPacientePorId(pacienteId).subscribe({
        next: (response) => {
          this.paciente = response;
          console.log('Paciente encontrado:', response);
        },
        error: (e) => console.error('Erro ao buscar paciente:', e)
      });
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
    }
  }

  calcularIdade(data: any): string | number {
    if (!data) return '--';
    let d: Date;
    if (Array.isArray(data)) d = new Date(data[0], data[1] - 1, data[2]);
    else if (typeof data === 'string' && data.includes('-')) d = new Date(data.split('T')[0]);
    else if (typeof data === 'string' && data.includes('/')) d = new Date(data.split('/').reverse().join('-'));
    else d = new Date(data);

    if (isNaN(d.getTime())) return '--';
    const hj = new Date();
    let id = hj.getFullYear() - d.getFullYear();
    if (hj.getMonth() < d.getMonth() || (hj.getMonth() === d.getMonth() && hj.getDate() < d.getDate())) id--;
    return id;
  }

  getListaExames(): any[] {
    return this.paciente?.laudos || this.paciente?.exames || [];
  }

  isStatusConcluido(item: any): boolean {
    const status = item.status || "Concluído";
    return status.toLowerCase() === 'concluído';
  }

  formatarDataResumo(item: any): string {
    let dataFormatada = item.dataExame || item.data || item.dataCriacao || "N/D";
    if (Array.isArray(dataFormatada)) {
      dataFormatada = `${String(dataFormatada[2]).padStart(2, '0')}/${String(dataFormatada[1]).padStart(2, '0')}/${dataFormatada[0]}`;
    } else if (typeof dataFormatada === 'string' && dataFormatada.includes('T')) {
      const d = new Date(dataFormatada);
      if (!isNaN(d.getTime())) {
        dataFormatada = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
      }
    }
    return dataFormatada;
  }
}
