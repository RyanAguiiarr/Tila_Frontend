import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../core/services/store/auth.store';
import { inject } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-laudo-ia',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
  templateUrl: './laudo-ia.component.html',
  styleUrls: ['./laudo-ia.component.css']
})
export class LaudoIaComponent implements OnInit {
  private authStore = inject(AuthStore);
  user = this.authStore.user;
  
  isSidebarOpen = false;

  pacienteMock = { id: 'ID-29402' };
  
  draftData = {
    achados: "Os pulmões estão limpos sem consolidação focal, derrame ou pneumotórax. A silhueta cardiomediastinal é normal em tamanho e contorno. As estruturas ósseas visualizadas estão intactas. Nenhum processo cardiopulmonar agudo identificado.",
    impressao: [
      "Radiografia de tórax normal.",
      "Nenhuma evidência de doença pulmonar ativa ou insuficiência cardíaca congestiva.",
      "Alinhamento satisfatório das estruturas ósseas visualizadas."
    ],
    recomendacoes: "Nenhum acompanhamento radiográfico adicional é indicado com base nesses achados. A correlação com os sintomas clínicos é recomendada se a condição do paciente mudar."
  };

  confidenceScore = 98.4;

  ngOnInit() {
  }

  setIsSidebarOpen(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}
