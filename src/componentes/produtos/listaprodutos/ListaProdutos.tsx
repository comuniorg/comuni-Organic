import { Card, CardActions, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Produto from '../../../models/Produto';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './ListaProdutos.css';
import useLocalStorage from 'react-use-localstorage';
import UsuarioLogin from '../../../models/UsuarioLogin';

const useStyles = makeStyles({
  div: {
    backgroundColor: '#C6E5B1',
    minHeight: '746px',
  },
  card: {
    backgroundColor: '#fefae0',
    borderRadius: '20px',
  }
})

function ListaProdutos() {
  const classes = useStyles();

  const [produtos, setProdutos] = useState<Produto[]>([])
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

  useEffect(() => {
    if (!usuarios.length) {
      getUsuarios();
    }
    else if (!usuario.usuario) {
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario == email) {
          setUsuario(usuarios[i])
          break;
        }
      }
    }
  });

  useEffect(() => {
    getUsuarios();
  }, [email])

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  async function getUsuarios() {
    await busca('/usuarios/all', setUsuarios, {
      headers: {
        Authorization: token
      }
    })
  }
  
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
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
      navigate("/login")

    }
  }, [token])

  async function getProduto() {
    await busca("/produto", setProdutos, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {

    getProduto()

  }, [produtos.length])

  return (
    <>
      <Grid container className={classes.div}>
        {
          produtos.map(produto => (
            <Grid key={produto.id} item xs={6} sm={4} md={3}>
              <Box m={2}>
                <Card variant="outlined" className={classes.card}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={produto.foto}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography variant="body2" component="p">
                      Vendedor: {produto.usuario?.nome}
                    </Typography>
                    
                    <Typography variant="body2" component="p">
                      Contato: {produto.usuario?.usuario}
                    </Typography>
                    
                    <Typography variant="h5" component="h2">
                      {produto.nome}
                    </Typography>

                    <Typography variant="body2" component="p">
                      R$: {produto.preco}
                    </Typography>

                    <Typography variant="body2" component="p">
                      Quantidade: {produto.quantidade}
                    </Typography>

                    <Typography variant="body2" component="p">
                      Categoria: {produto.categoria?.categoria}
                    </Typography>

                    <Typography variant="body2" component="p">
                      Localidade: {produto.categoria?.localidade}
                    </Typography>
                  </CardContent>
                  <CardActions>                    
                    { (usuario.usuario === produto.usuario?.usuario)?
                      <Box display="flex" justifyContent="center" mb={1.5}>
                        <Link to={`/formularioproduto/${produto.id}`} className="text-decorator-none">
                          <Box mx={1}>
                            <button className="jata">
                              <span>Alterar</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                  <path d="M1,5 L11,5"></path>
                                  <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                          </Box>
                        </Link>
                        <Link to={`/deletarproduto/${produto.id}`} className="text-decorator-none">
                          <Box mx={1}>
                            <button className="rara">
                              <span>Deletar</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                  <path d="M1,5 L11,5"></path>
                                  <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                          </Box>
                        </Link>
                      </Box> :
                      <Box display="flex" justifyContent="center" mb={1.5}>
                        <Box mx={1}>
                          <button className="jata">
                            <span>comprar</span>
                              <svg viewBox="0 0 13 10" height="10px" width="15px">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                              </svg>
                          </button>
                        </Box>
                      </Box>
                    }
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </>
  );
}

export { ListaProdutos };