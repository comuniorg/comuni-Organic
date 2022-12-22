import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, FormControl, makeStyles, Grid } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import Categoria from '../../../models/Categoria';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import './CadastroCategoria.css';
import { useStyles } from './style';
import loogo from '../../../assets/images/loogo.png'

function CadastroCategoria() {
  const classes = useStyles();

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
        position: 'bottom-left', // position? baixo esquerda
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
        Authorization: token
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
          Authorization: token
        }
      });
      toast.success('Categoria atualizado com sucesso', {
        position: 'bottom-left', // position? baixo esquerda
        autoClose: 2000, // Fechar automaticamente? após 2 segundos
        hideProgressBar: false, // não mostrar o progresso? mostrar
        closeOnClick: true, // fechar após o click? sim
        pauseOnHover: false, // pausar quando o usuário mover o mouse? não
        draggable: false, // permitir mover a notificação do local? não
        theme: 'light', // tema? light
        progress: undefined // 
      });
    }
    else {
      post(`/categoria`, categoria, setCategoria, {
        headers: {
          Authorization: token
        }
      });
      toast.success('Categoria cadastrado com sucesso', {
        position: 'bottom-left', // position? baixo esquerda
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
    <Grid container direction='row' justifyContent='center' className={classes.Gridd} style={{minHeight: 'calc(100vh - 148px)'}}>
      <div>
        <Container maxWidth="sm">
          <form onSubmit={onSubmit} className={classes.form} >
            <Typography variant="h3" color="textSecondary" component="h1" align="center" >
              <img className={classes.imagemlogo} src={loogo} alt='Imagemlogo' />

            </Typography>

            <TextField value={categoria.categoria} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="categoria" label="categoria" name="categoria" variant="outlined" margin="normal" fullWidth required />

            <TextField value={categoria.localidade} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="localidade" label="localidade" name="localidade" variant="outlined" margin="normal" fullWidth required />

            <FormControl>
              <button className="form">
                <span>{(id !== undefined) ? 'alterar' : 'cadastrar'}</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </FormControl>
          </form>
        </Container>
      </div>
    </Grid>
  )
}
export default CadastroCategoria;