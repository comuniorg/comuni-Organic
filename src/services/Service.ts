import axios from 'axios';
import UsuarioLogin from '../models/UsuarioLogin';

export const api = axios.create({
	baseURL: 'https://db-organica-tgxd.onrender.com'
});

export const cadastroUsuario = async (url: string, dados: {nome: string, usuario: string, senha: string}, setDado: React.Dispatch<React.SetStateAction<UsuarioLogin>>) => {
	const resposta = await api.post(url, dados)
	setDado(resposta.data)
}

export const login = async (url: string, dados: {usuario: string, senha: string}, setDado: React.Dispatch<string>) => {
	const resposta = await api.post(url, dados)
	setDado(resposta.data.token)
}