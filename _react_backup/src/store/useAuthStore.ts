import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface UserProfile{
    nome: string;
  email: string;
  crm: string;
  especialidade: string;
}

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (userData) => set({ user: userData, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      fetchProfile: async () => {
        try {
          const response = await api.get('/auth/me');
          console.log("dados de retorno do fetchProfile: ", response.data);
          // O Zustand vai salvar automaticamente esse 'user' no LocalStorage
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
          console.error("Sessão expirada ou inválida");
        }
      }
    }),
    {
      name: 'tila-auth-storage', // Nome da chave que aparecerá no LocalStorage
    }
  )
);