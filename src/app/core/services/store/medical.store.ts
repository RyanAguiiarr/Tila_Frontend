import { Injectable, signal, computed } from '@angular/core';

export interface MedicoState {
  selectedPacienteCpf: string | null;
  rascunhoLaudo: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicalStore {
  private readonly state = signal<MedicoState>({
    selectedPacienteCpf: null,
    rascunhoLaudo: ''
  });

  readonly selectedPacienteCpf = computed(() => this.state().selectedPacienteCpf);
  readonly rascunhoLaudo = computed(() => this.state().rascunhoLaudo);

  setSelectedPaciente(cpf: string) {
    this.state.update(state => ({ ...state, selectedPacienteCpf: cpf }));
  }

  setRascunhoLaudo(text: string) {
    this.state.update(state => ({ ...state, rascunhoLaudo: text }));
  }

  limparContexto() {
    this.state.set({ selectedPacienteCpf: null, rascunhoLaudo: '' });
  }
}
