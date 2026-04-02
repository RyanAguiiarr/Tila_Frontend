import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  id?: string | number;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: Date;
  telefone: string;
  exames?: any[];
  laudos?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PacienteApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/paciente';

  cadastrarPaciente(dados: Paciente): Observable<any> {
    return this.http.post(this.baseUrl, dados);
  }

  buscarTodosPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.baseUrl);
  }

  buscarPacientePorId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
