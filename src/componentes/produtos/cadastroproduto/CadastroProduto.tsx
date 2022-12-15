import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, InputLabel, MenuItem, FormControl, FormHelperText, Select, Grid } from "@material-ui/core"
import './CadastroProduto.css';
import { useNavigate, useParams } from 'react-router-dom';
import { busca, buscaId, post, put } from '../../../services/Service';
import Produto from '../../../models/Produto';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import Categoria from '../../../models/Categoria';
import { Box } from '@mui/material';
import comuLogo from '../../../assets/images/logo.real.png';
import { styles } from './styles';

function CadastroProduto() {

  const classes = styles();
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    categoria: '',
    localidade: ''
  })

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria
    })
  }, [categoria])

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: '',
    quantidade: 0,
    foto: '',
    preco: 0,
    categoria: { id: 0, categoria: '', localidade: '' }
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

  async function getCategorias() {
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
      categoria: categoria
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
    else if (produto.quantidade > 0 && produto.preco > 0) {
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
    else {
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
      <Grid container direction='row' justifyContent='center' className='form-produtos'>
        <Grid item xs={12} >
          <Box className={classes.box}>
            <Grid container alignItems='center' justifyContent='center'>
              <Grid item xs={12} sm={12} md={9} lg={4} xl={4}>
                <form onSubmit={onSubmit} className={classes.form} >
                  <Typography variant='h3' className='cadastro-produto' color='textPrimary' align='center' >
                    <p>Cadastrar Produto</p>
                  </Typography>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Grid item xs={10}>
                      <TextField value={produto.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="nome" label="Nome" variant="outlined" name="nome" margin="normal" fullWidth required />
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Grid item xs={10}>
                      <TextField value={produto.quantidade} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="quantidade" label="Quantidade" name="quantidade" variant="outlined" margin="normal" fullWidth />
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Grid item xs={10}>
                      <TextField value={produto.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="foto" label="Foto (Insira o link)" name="foto" variant="outlined" margin="normal" fullWidth required />
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Grid item xs={10}>
                      <TextField value={produto.preco} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="preco" label="Preço" name="preco" variant="outlined" margin="normal" fullWidth />
                    </Grid>
                  </Grid>

                  <Grid container alignItems='center' justifyContent='center'>
                    <Grid item xs={10}>
                      <FormControl>
                        <InputLabel id="demo-simple-select-helper-label" >Categoria</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          onChange={(e) => buscaId(`/categoria/${e.target.value}`, setCategoria, {
                            headers: {
                              Authorization: token
                            }
                          })}
                        >
                          {
                            categorias.map((categoria, index) => (
                              <MenuItem key={categoria.id} value={categoria.id}>
                                {categoria.categoria + ' - ' + categoria.localidade}
                              </MenuItem>
                            ))
                          }
                        </Select>
                        <FormHelperText>Escolha o tipo e a localidade do produto</FormHelperText>
                        <Button id='botao_login' type='submit' variant='contained'>
                          Finalizar
                        </Button>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Grid >
      </Grid >
    </>
  )
}
export default CadastroProduto;