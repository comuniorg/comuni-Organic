import { Button, Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import UsuarioLogin from '../../models/UsuarioLogin';
import { login } from '../../services/Service';
import './Login.css';
import GroupIcon from '@mui/icons-material/Group';
import { NoEncryption } from '@material-ui/icons';
import { styles } from './styles';
import comuLogo from '../../assets/images/logo.real.png';

function Login() {

  const classes = styles();
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

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (token != '') {
      navigate('/home');
    }
  })

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await login(`/auth/logar`, usuarioLogin, setToken) // setTokin está salvando o tokin no localstorage
      alert('usuario logado com sucesso!');
    } catch (error) {
      alert('Dados do usuário inconsistentes. Erro ao logar!');
    }
  }

  return (
    <>
      <Grid container direction='row' justifyContent='center' className='alignItems-center1'>
        <Grid item className='alignItems-center1 imagem' xs={12} >
          <Box className={classes.box}>
            <Grid container>
              <Grid item xs={12} sm={12} md={9} lg={4} xl={4}>
                <form onSubmit={onSubmit} className={classes.form} >
                  <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' >
                    <img className={classes.imagemLogo} src={comuLogo} alt="" />
                  </Typography>
                  <Grid container alignItems='center' spacing={1}>
                    <Grid item xs={1}>
                      <GroupIcon />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField className='opacidade' value={usuarioLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth />
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={1}>
                      <NoEncryption />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField value={usuarioLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                    </Grid>
                  </Grid>
                  <Box marginTop={2} textAlign='center' >
                    <Button id='botao_login' type='submit' variant='contained' >
                      Logar
                    </Button>
                  </Box>
                  <Box marginTop={2}>
                    <Box marginRight={1}>
                      <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                    </Box>
                    <Typography variant='subtitle1' gutterBottom align='center'>
                      <Link to="/cadastrarusuario">
                        Cadastre-se
                      </Link>
                    </Typography>
                  </Box>
                </form>             
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export { Login };