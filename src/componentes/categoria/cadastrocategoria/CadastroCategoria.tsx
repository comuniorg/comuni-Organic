import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, FormControl } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import Categoria from '../../../models/Categoria';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import './CadastroCategoria.css';

function CadastroCategoria() {

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState['tokens']>(
		(state) => state.tokens
	)

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    categoria: '',
    localidade: ''
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
    if (id != undefined) {
      findById(id)
    }
  }, [id])

  async function findById(id: string) {
    await buscaId(`/categoria/${id}`, setCategoria, {
      headers: {
        'Authorization': token
      }
    })
  }

  function updatedCategoria(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      put(`/categoria`, categoria, setCategoria, {
        headers: {
          'Authorization': token
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
    else{
      post(`/categoria`, categoria, setCategoria, {
        headers: {
          'Authorization': token
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
    back()
  }

  function back() {
    navigate('/categorias');
  }

  return (
    <>
      <Container maxWidth="sm" className="topo">
        <form onSubmit={onSubmit}>
          <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro</Typography>

          <TextField value={categoria.categoria} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="categoria" label="categoria" name="categoria" variant="outlined" margin="normal" fullWidth required/>

          <TextField value={categoria.localidade} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="localidade" label="localidade" name="localidade" variant="outlined" margin="normal" fullWidth required/>

          <FormControl >
            <Button type="submit" variant="contained" color="primary">
              Finalizar
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  )
}
export default CadastroCategoria;