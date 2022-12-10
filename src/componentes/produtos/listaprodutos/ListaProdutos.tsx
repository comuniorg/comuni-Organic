import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Produto from '../../../models/Produto';
import { busca } from '../../../services/Service';
import './ListaProdutos.css';

function ListaProdutos() {

  const [produtos, setProdutos] = useState<Produto[]>([])
  const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
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
                        Categoria: {produto.categoria?.categoria}
                      </Typography>

                      <Typography variant="body2" component="p">
                        Localidade: {produto.categoria?.localidade}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box display="flex" justifyContent="center" mb={1.5}>

                      <Link to={`/formularioProduto/${produto.id}`} className="text-decorator-none" >
                        <Box mx={1}>
                          <Button variant="contained" className="marginLeft" size='small' color="primary" >
                            atualizar
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