import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AuthStore } from '../../core/services/store/auth.store';
import {LogAuditoriaService, LogAuditoria} from '../../core/services/api/logs-api.service';

interface LogEvent {
  id: string;
  userInitials: string;
  userName: string;
  userId: string;
  action: string;
  date: string;
  time: string;
  ip: string;
  status: 'SUCESSO' | 'AVISO' | 'BLOQUEADO';
  statusClass: string;
  actionIcon: string;
}

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit{
  private authStore = inject(AuthStore);
  user = this.authStore.user;
  logs: LogAuditoria[] = [];
  private logAuditoriaService = inject(LogAuditoriaService);

  isSidebarOpen = false;

  setIsSidebarOpen(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  ngOnInit(): void {
    this.logAuditoriaService.buscarTodosOsLogs().subscribe(logs => this.logs = logs);
  }
}
