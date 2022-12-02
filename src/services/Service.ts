import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
    baseURL: 'https://db-organica-tgxd.onrender.com/'
})

export const cadastroUsuario = async(url: string, dados: {nome: string, usuario: string, senha: string}, setDado: any) => {
    const resposta = await api.post(url,dados)
    setDado(resposta.data)
}