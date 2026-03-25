import axios from "axios";

interface paciente {
    nomeCompleto: string;
    cpf: string;
    dataNascimento: Date;
    telefone: string;
    exames: Object[];
}

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const buscarTodosPacientes = async () => {
    try {
        const response = await api.get('/paciente');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        throw error;
    }
};