import axios from 'axios';

interface Cadastro {
    nome: string;
    crm: string;
    especialidade: string;
    email: string;
    senha: string;
}

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiCadastro = {
    cadastrar: async (req: Cadastro) => {
        const response = await api.post('/auth/registrar', req);
        return response.data;
    },
};