import axios from 'axios';

interface Login {
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

export const apiLogin = {
    login: async (req: Login) => {
        const response = await api.post('/auth/login', req);
        console.log("retorno da api", response);
        return response.data;
    },
};