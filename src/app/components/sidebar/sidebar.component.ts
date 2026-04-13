import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../core/services/store/auth.store';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isSidebarOpen = false;
  @Output() closeSidebarEvent = new EventEmitter<void>();

  private authStore = inject(AuthStore);
  user = this.authStore.user;

  closeSidebar() {
    this.closeSidebarEvent.emit();
  }
}
