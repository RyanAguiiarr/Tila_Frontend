import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthStore } from '../../core/services/store/auth.store';
import { PacienteApiService, Paciente } from '../../core/services/api/paciente-api.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  private pacienteApi = inject(PacienteApiService);
  
  isSidebarOpen = false;
  user = this.authStore.user;
  
  pacientes: Paciente[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  get totalPages() {
    return Math.ceil(this.pacientes.length / this.itemsPerPage);
  }

  get currentPacientes() {
    const indexOfLastItem = this.currentPage * this.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.itemsPerPage;
    return this.pacientes.slice(indexOfFirstItem, indexOfLastItem);
  }

  ngOnInit() {
    this.buscarPacientes();
  }

  setIsSidebarOpen(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  handlePageChange(page: number | string) {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    if (this.totalPages <= 1) return [1];
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, '...', this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }
    return pages;
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

  obterIniciais(nome: string = ''): string {
    const p = nome.trim().split(' ').filter(Boolean);
    return p.length > 1 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : p[0]?.substring(0, 2).toUpperCase() || '?';
  }

  getAvatarClasses(index: number): string {
    const colors = ['blue', 'purple', 'green', 'red', 'yellow-dark', 'gray-dark'];
    const color = colors[index % colors.length];
    return `avatar-initials bg-light-${color.replace('-dark', '')} text-${color}`;
  }

  buscarPacientes() {
    this.pacienteApi.buscarTodosPacientes().subscribe({
      next: (data) => {
        console.log("Agora sim, os dados chegaram:", data);
        this.pacientes = data;
      },
      error: (e) => console.error('Erro ao buscar pacientes:', e)
    });
  }

  totalExames(): number {
    let total = 0;
    for (const p of this.pacientes) {
      if (p.exames) {
        total += p.exames.length;
      }
    }
    return total;
  }
}
