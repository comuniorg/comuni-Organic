import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, InputLabel, MenuItem, FormControl, FormHelperText, Select } from "@material-ui/core"
import './CadastroProduto.css';
import { useNavigate, useParams } from 'react-router-dom';
import { busca, buscaId, post, put } from '../../../services/Service';
import Produto from '../../../models/Produto';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import Categoria from '../../../models/Categoria';
import UsuarioLogin from '../../../models/UsuarioLogin';
import useLocalStorage from 'react-use-localstorage';

function CadastroProduto() {

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioLogin[]>([]);
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: null
  });

  const [email, setEmail] = useLocalStorage('email');

  useEffect(() =>{
    if(!usuarios.length){
      getUsuarios();
    } else if (!usuario.usuario) {
      for(let i=0; i<usuarios.length; i++){
        if(usuarios[i].usuario == email){
          setUsuario(usuarios[i])
          break;
        }
      }
    }
  })

  useEffect(() => {
    getUsuarios();
  }, [email])
  
  const token = useSelector<TokenState, TokenState['tokens']>(
		(state) => state.tokens
	)

  async function getUsuarios(){
    await busca('/usuarios/all', setUsuarios, {
      headers: {
        Authorization: token
      }
    })
  }

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    categoria: '',
    localidade: ''
  })

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
      usuario: usuario
    })
  }, [categoria])

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: '',
    quantidade: 0,
    foto: '',
    preco: 0,
    categoria: {id: 0, categoria: '', localidade: ''},
    usuario: {id: 0, nome: '', usuario: '', senha: '', foto: '', token: null,}
  })

  useEffect(() => {
    if (token == '') {
      toast.error('Você precisa estar logado', {
        position: 'top-right', // position? topo direita
        autoClose: 2000, // Fechar automaticamente? após 2 segundos
        hideProgressBar: false, // não mostrar o progresso? mostrar
        closeOnClick: true, // fechar após o click? sim
        pauseOnHover: false, // pausar quando o usuário mover o mouse? não
        draggable: false, // permitir mover a notificação do local? não
        theme: 'light', // tema? light
        progress: undefined // 
      });
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    getCategorias()
    if (id != undefined) {
      findById(id)
    }
  }, [id])

  async function getCategorias(){
    await busca(`/categoria`, setCategorias, {
      headers: {
        Authorization: token
      }
    })
  }

  async function findById(id: string) {
    await buscaId(`/produto/${id}`, setProduto, {
      headers: {
        Authorization: token
      }
    })
  }

  function updatedProduto(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
      usuario: usuario
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined && produto.quantidade > 0 && produto.preco > 0) {
      put(`/produto`, produto, setProduto, {
        headers: {
          Authorization: token
        }
      });
      toast.success('Produto atualizado com sucesso', {
				position: 'top-right', // position? topo direita
				autoClose: 2000, // Fechar automaticamente? após 2 segundos
				hideProgressBar: false, // não mostrar o progresso? mostrar
				closeOnClick: true, // fechar após o click? sim
				pauseOnHover: false, // pausar quando o usuário mover o mouse? não
				draggable: false, // permitir mover a notificação do local? não
				theme: 'light', // tema? light
				progress: undefined // 
			});
    }
    else if(produto.quantidade > 0 && produto.preco > 0){
      post(`/produto`, produto, setProduto, {
        headers: {
          Authorization: token
        }
      });
      toast.success('Produto cadastrado com sucesso', {
				position: 'top-right', // position? topo direita
				autoClose: 2000, // Fechar automaticamente? após 2 segundos
				hideProgressBar: false, // não mostrar o progresso? mostrar
				closeOnClick: true, // fechar após o click? sim
				pauseOnHover: false, // pausar quando o usuário mover o mouse? não
				draggable: false, // permitir mover a notificação do local? não
				theme: 'light', // tema? light
				progress: undefined // 
			});
    }
    else{
      toast.error('Você precisa preencher os campos', {
        position: 'top-right', // position? topo direita
        autoClose: 2000, // Fechar automaticamente? após 2 segundos
        hideProgressBar: false, // não mostrar o progresso? mostrar
        closeOnClick: true, // fechar após o click? sim
        pauseOnHover: false, // pausar quando o usuário mover o mouse? não
        draggable: false, // permitir mover a notificação do local? não
        theme: 'light', // tema? light
        progress: undefined // 
      });
    }
    back()
  }

  function back() {
    navigate('/Produtos');
  }

  return (
    <>
      <Container maxWidth="sm" className="topo">
        <form onSubmit={onSubmit}>
          <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro</Typography>

          <TextField value={produto.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="nome" label="nome" variant="outlined" name="nome" margin="normal" fullWidth required/>

          <TextField value={produto.quantidade} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="quantidade" label="quantidade" name="quantidade" variant="outlined" margin="normal" fullWidth/>

          <TextField value={produto.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="foto" label="foto" name="foto" variant="outlined" margin="normal" fullWidth required/>

          <TextField value={produto.preco} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="preco" label="preco" name="preco" variant="outlined" margin="normal" fullWidth/>

          <FormControl >
            <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                required
                onChange={(e) => buscaId(`/categoria/${e.target.value}`, setCategoria, {
                  headers: {
                    Authorization: token
                  }
                })}
              >
                {
                  categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.categoria + ' - ' + categoria.localidade}
                    </MenuItem>
                  ))
                }
              </Select>
            <FormHelperText>Escolha o tipo e a localidade do produto</FormHelperText>
            <Button type="submit" variant="contained" color="primary">
              Finalizar
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  )
}
export default CadastroProduto;