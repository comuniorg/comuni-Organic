import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import Categoria from '../../../models/Categoria';
import './ListaCategorias.css';
import { useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaCategorias() {
  const [categoria, setCategoria] = useState<Categoria[]>([])
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == '') {
      toast.error('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      navigate("/login")
    }
  }, [token])


  async function getCategoria() {
    await busca("/categoria", setCategoria, {
      headers: {
        Authorization: token
      }
    })
  }


  useEffect(() => {
    getCategoria()
  }, [categoria.length])

  return (
    <>
      <Grid container>
        {
          categoria.map(categoria => (
            <Grid item key={categoria.id} xs={12} sm={6} md={3}>
              <Box m={2} >
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Categoria
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Categoria: {categoria.categoria}
                    </Typography>
        
                    <Typography variant="h5" component="h2">
                      Localidade: {categoria.localidade}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Box display="flex" justifyContent="center" mb={1.5} >
                      <Link to={`/formulariocategoria/${categoria.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" className="marginLeft" size='small' color="primary" >
                            atualizar
                          </Button>
                        </Box>
                      </Link>
                      <Link to={`/deletarcategoria/${categoria.id}`} className="text-decorator-none">
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


export default ListaCategorias;