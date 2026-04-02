import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { UserProfile, AuthApiService } from '../api/auth-api.service';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private authApi = inject(AuthApiService);

  private readonly state = signal<AuthState>({
    user: null,
    isAuthenticated: false
  });

  // Selectors (computed signals)
  readonly user = computed(() => this.state().user);
  readonly isAuthenticated = computed(() => this.state().isAuthenticated);

  constructor() {
    this.carregarEstado();
    
    // Persist effect
    effect(() => {
      const currentState = this.state();
      localStorage.setItem('tila-auth-storage', JSON.stringify({ state: currentState }));
    });
  }

  private carregarEstado() {
    const savedState = localStorage.getItem('tila-auth-storage');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (parsedState.state) {
          this.state.set(parsedState.state);
        }
      } catch (e) {
        console.error('Failed to parse auth state', e);
      }
    }
  }

  login(userData: UserProfile) {
    this.state.set({ user: userData, isAuthenticated: true });
  }

  logout() {
    this.state.set({ user: null, isAuthenticated: false });
    // Also might want to clear a cookie or call an API logout endpoint here
  }

  async fetchProfile() {
    try {
      const profile$ = this.authApi.getMe().pipe(
        map(user => {
          console.log("dados de retorno do fetchProfile: ", user);
          this.state.set({ user, isAuthenticated: true });
          return user;
        }),
        catchError(error => {
          this.state.set({ user: null, isAuthenticated: false });
          console.error("Sessão expirada ou inválida", error);
          return of(null);
        })
      );
      await firstValueFrom(profile$);
    } catch (e) {
      console.error(e);
    }
  }
}
