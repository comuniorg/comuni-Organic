import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import UsuarioLogin from '../../models/UsuarioLogin';
import { login } from '../../services/Service';
import './Login.css';

function Login() {

  let navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token');
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: '',
      token: '',
    }
  )

  function updateModel(e: ChangeEvent<HTMLInputElement>){
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if(token != ''){
      navigate('/home');
    }
  })

  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();

    try{
      await login(`/auth/logar`, usuarioLogin, setToken) // setTokin está salvando o tokin no localstorage
      alert('usuario logado com sucesso!');
    }catch(error){
      alert('Dados do usuário inconsistentes. Erro ao logar!');
    }
  }

  return (
    <>
      <Grid container direction='row' justifyContent='center' className='alignItems-center1'>
        <Grid item className='alignItems-center1' xs={12} sm={9} md={6}>
          <Box paddingX={10} sx={{ my: 10 }}>
            <form onSubmit={onSubmit}>
              <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
              <TextField value={usuarioLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth />
              <TextField value={usuarioLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
              <Box marginTop={2} textAlign='center'>
                <Button type='submit' variant='contained' color='primary'>
                  Logar
                </Button>
              </Box>
            </form>
            <Box display='flex' justifyContent='center' marginTop={2}>
              <Box marginRight={1}>
                <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
              </Box>
              <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>
                <Link to="/cadastrarusuario">
                  Cadastre-se
                </Link>
                </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export { Login };