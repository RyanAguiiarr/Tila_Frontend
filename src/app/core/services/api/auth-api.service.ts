import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cadastro {
  nome: string;
  crm: string;
  especialidade: string;
  email: string;
  senha: string;
}

export interface Login {
  email: string;
  senha: string;
}

export interface UserProfile {
  nomeCompleto: string;
  email: string;
  crm: string;
  especialidade: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private http = inject(HttpClient);  
  private baseUrl = 'http://localhost:8080/auth';

  login(req: Login): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, req);
  }

  cadastrar(req: Cadastro): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, req);
  }

  getMe(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/me`);
  }
}
