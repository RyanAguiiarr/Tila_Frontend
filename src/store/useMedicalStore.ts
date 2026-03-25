import { create } from 'zustand';

interface MedicoState {
  selectedPacienteCpf: string | null;
  rascunhoLaudo: string;
  setSelectedPaciente: (cpf: string) => void;
  setRascunhoLaudo: (text: string) => void;
  limparContexto: () => void;
}

export const useMedicalStore = create<MedicoState>((set) => ({
  selectedPacienteCpf: null,
  rascunhoLaudo: '',
  setSelectedPaciente: (cpf: string) => set({ selectedPacienteCpf: cpf }),
  setRascunhoLaudo: (text: string) => set({ rascunhoLaudo: text }),
  limparContexto: () => set({ selectedPacienteCpf: null, rascunhoLaudo: '' }),
}));