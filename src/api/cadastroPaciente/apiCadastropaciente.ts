import axios from "axios";

interface paciente {
    nomeCompleto: string;
    cpf: string;
    dataNascimento: Date;
    telefone: string;
}

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const cadastrarPaciente = async (dados: paciente) => {
    try {
        const response = await api.post("/paciente", dados);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar paciente:", error);
        throw error;
    }
}

