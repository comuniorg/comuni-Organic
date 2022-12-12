import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
      alert('você precisa estar logado')
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
        'Authorization': token
      }
    })
  }

  function sim() {
    navigate('/produtos');
    deleteId(`/produto/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    alert('Postagem deletado com sucesso');
  }
  function nao() {
    navigate('/produtos');
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Produto:
              </Typography>

              <Typography color="textSecondary" >
                {produto?.nome}
              </Typography>

              <Typography color="textSecondary" >
                <img src={produto?.foto} alt="Maça" />
              </Typography>

              <Typography color="textSecondary" >
                {produto?.preco}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarProduto;