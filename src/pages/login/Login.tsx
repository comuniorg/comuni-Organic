import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsuarioLogin from '../../models/UsuarioLogin';
import { login, salvarEmail } from '../../services/Service';
import { addToken } from '../../store/tokens/actions';
import { useDispatch } from 'react-redux';
import './Login.css';
import { toast } from 'react-toastify';
import useLocalStorage from 'react-use-localstorage';

function Login() {

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [token, setToken] = useState('');

  const [email, setEmail] = useLocalStorage('email');

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
      dispatch(addToken(token))
      navigate('/home');
    }
  })

  async function usuarioEmail(){
    await salvarEmail(`/auth/logar`, usuarioLogin, setEmail)
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();

    try{
      await login(`/auth/logar`, usuarioLogin, setToken) // setTokin está salvando o tokin no Redux
      usuarioEmail();
      toast.success('Usuário logado com sucesso', {
				position: 'top-right', // position? topo direita
				autoClose: 2000, // Fechar automaticamente? após 2 segundos
				hideProgressBar: false, // não mostrar o progresso? mostrar
				closeOnClick: true, // fechar após o click? sim
				pauseOnHover: false, // pausar quando o usuário mover o mouse? não
				draggable: false, // permitir mover a notificação do local? não
				theme: 'light', // tema? light
				progress: undefined // 
			});
    }catch(error){
      toast.error('Dados do usuário inconsistentes. Erro ao logar', {
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
  }

  return (
    <>
      <Grid container direction='row' justifyContent='center' className='alignItems-center1'>
        <Grid item className='alignItems-center1' xs={12} sm={9} md={6}>
          <Box paddingX={10} sx={{ my: 10 }}>
            <form onSubmit={onSubmit}>
              <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
              <TextField value={usuarioLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' variant='outlined' name='usuario' margin='normal' fullWidth required/>
              <TextField value={usuarioLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth required/>
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