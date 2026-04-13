import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthStore } from './core/services/store/auth.store';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  
  isInternalScreen = false;

  ngOnInit() {
    this.authStore.fetchProfile();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      const currentScreen = url.split('/')[1] || 'login';
      this.isInternalScreen = ['dashboard', 'pacientes', 'prontuario', 'laudo', 'logs'].includes(currentScreen);
    });
  }
}
