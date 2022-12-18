import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLocalStorage from 'react-use-localstorage';
import Produto from '../../../models/Produto';
import { buscaId, deleteId } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './DeletarProduto.css';



function DeletarProduto() {

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  const [produto, setProduto] = useState<Produto>()

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
    buscaId(`/produto/${id}`, setProduto, {
      headers: {
        Authorization: token
      }
    })
  }

  function sim() {
    navigate('/produtos');
    deleteId(`/produto/${id}`, {
      headers: {
        Authorization: token
      }
    });
    toast.success('Produto deletado com sucesso', {
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
  function nao() {
    navigate('/produtos');
  }

  return (
    <>
      <Grid container xs={12} sm={6} md={4} lg={3} style={{ margin: '20px' }}>
        <Box m={2} >
          <Card variant="outlined" className='back'>
            <CardContent>
              <Box justifyContent="center">
                <Typography color="textSecondary" gutterBottom>
                  Deseja deletar o Produto:
                </Typography>
                <CardMedia
                  component="img"
                  height="300"
                  image={produto?.foto}
                  alt="green iguana"
                />
                <Typography variant="body2" component="p">
                  Vendedor: {produto?.usuario?.nome}
                </Typography>

                <Typography variant="body2" component="p">
                  Contato: {produto?.usuario?.usuario}
                </Typography>

                <Typography variant="h5" component="h2">
                  {produto?.nome}
                </Typography>

                <Typography variant="body2" component="p">
                  R$: {produto?.preco}
                </Typography>

                <Typography variant="body2" component="p">
                  Quantidade: {produto?.quantidade}
                </Typography>

                <Typography variant="body2" component="p">
                  Categoria: {produto?.categoria?.categoria}
                </Typography>

                <Typography variant="body2" component="p">
                  Localidade: {produto?.categoria?.localidade}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                <Box mx={2}>
                  <button onClick={sim} className="aacta">
                    <span>sim</span>
                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </Box>
                <Box mx={2}>
                  <button onClick={nao} className="acta">
                    <span>não</span>
                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </>
  );
}
export default DeletarProduto;