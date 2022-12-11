import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Produto from '../../../models/Produto';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './ListaProdutos.css';

function ListaProdutos() {

  const [produtos, setProdutos] = useState<Produto[]>([])

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )
  
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
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
      navigate("/login")

    }
  }, [token])

  async function getProduto() {
    await busca("/produto", setProdutos, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getProduto()

  }, [produtos.length])

  return (
    <>
      <Grid container>
        {
          produtos.map(produto => (
            <Grid item xs={6} sm={4} md={3}>
              <Box m={2}>
                <Card variant="outlined">
                  <CardContent className='flexbox' style={{minHeight: '450px'}}>
                    <img src={produto.foto} alt="foto" style={{width: '300px'}}/>

                    <Box>
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
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box display="flex" justifyContent="center" mb={1.5}>
                      <Link to={`/formularioProduto/${produto.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" className="marginLeft" size='small' color="primary" >
                            Comprar
                          </Button>
                        </Box>
                      </Link>
                      <Link to={`/deletarProduto/${produto.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" size='small' color="secondary">
                            deletar
                          </Button>
                        </Box>
                      </Link>
                    </Box>
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