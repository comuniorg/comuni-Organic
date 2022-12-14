import axios from 'axios';
import UsuarioLogin from '../models/UsuarioLogin';

export const api = axios.create({
	//baseURL: 'https://db-organica-tgxd.onrender.com'
	baseURL: 'http://localhost:4000'
});

export const cadastroUsuario = async (url: string, dados: {nome: string, usuario: string, senha: string}, setDado: React.Dispatch<React.SetStateAction<UsuarioLogin>>) => {
	const resposta = await api.post(url, dados)
	setDado(resposta.data)
}

export const login = async (url: string, dados: {usuario: string, senha: string}, setDado: React.Dispatch<string>) => {
	const resposta = await api.post(url, dados)
	setDado(resposta.data.token)
}

export const salvarEmail = async (url: string, dados: {usuario: string, senha: string}, setDado: React.Dispatch<string>) => {
	const resposta = await api.post(url, dados)
	setDado(resposta.data.usuario)
}

export const busca = async(url: string, setDado: any, header: any) => {
	const resposta = await api.get(url, header)
	setDado(resposta.data)
}

export const buscaId = async (url: string, setDado: any, header: any) => {
	const resposta = await api.get(url, header)
	setDado(resposta.data)
}

export const deleteId = async (url: string, header: any) => {
	const resposta = await api.delete(url, header)
}

export const post = async (url:string, dados:any,setDado:any,header:any) =>{
	const resposta = await api.post(url,dados,header)
	setDado(resposta.data)
}

export const put = async (url:string, dados:any,setDado:any,header:any) =>{
	const resposta = await api.post(url,dados,header)
	setDado(resposta.data)
}