import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export interface LogAuditoria{
    usuario: User,
    acao: string,
    dataHora: Date,
    ipOrigem: string
}

export interface User {
  id: number;
  email: string;
  senha: string;
  perfil: string;
  ativo: boolean;
  ultimoAcesso: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LogAuditoriaService {
    private http = inject(HttpClient);
    private url = 'http://localhost:8080/logs'

    buscarTodosOsLogs(): Observable<LogAuditoria[]>{
        return this.http.get<LogAuditoria[]>(this.url);
    }
}


