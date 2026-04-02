import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../core/services/store/auth.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private authStore = inject(AuthStore);
  
  isSidebarOpen = false;
  user = this.authStore.user;
  //função para logar quando iniciar a tela de dashboar
  ngOnInit() {
    this.logarnoConsole();
  }
  private logarnoConsole() {
    console.log("dados do storage", this.user());
  }
  
  today = new Date().toLocaleDateString('pt-BR');

  setIsSidebarOpen(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}
