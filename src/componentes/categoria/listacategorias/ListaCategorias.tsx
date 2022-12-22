import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, Grid, makeStyles, createTheme } from '@material-ui/core';
import { Box } from '@mui/material';
import Categoria from '../../../models/Categoria';
import './ListaCategorias.css';
import { useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

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

function ListaCategorias() {
  const classes = useStyles();

  const [categoria, setCategoria] = useState<Categoria[]>([])
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == '') {
      toast.error('Você precisa estar logado', {
        position: "bottom-left",
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
    <div className={classes.div} style={{minHeight: 'calc(100vh - 148px)'}}>
      <Grid container>
        {
          categoria.map(categoria => (
            <Grid item key={categoria.id} xs={12} sm={6} md={4} lg={3}>
              <Box m={2}>
                <Card variant="outlined" className={classes.card}>
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
                    <Box display='flex' justifyContent='space-around' alignItems='center' style={{width: '100%'}} mb={1.5}>
                      <Link to={`/formulariocategoria/${categoria.id}`} className="text-decorator-none">
                        <Box mx={1}>
                        <button className="lia">
                            <span>Alterar</span>
                              <svg viewBox="0 0 13 10" height="10px" width="15px">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                              </svg>
                          </button>
                        </Box>
                      </Link>
                      <Link to={`/deletarcategoria/${categoria.id}`} className="text-decorator-none">
                        <Box mx={1}>
                        <button className="raa">
                            <span>Deletar</span>
                              <svg viewBox="0 0 13 10" height="10px" width="15px">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                              </svg>
                          </button>
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
    </div>
  );
}


export default ListaCategorias;