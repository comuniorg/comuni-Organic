import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsuarioLogin from '../../models/UsuarioLogin';
import { login, salvarEmail } from '../../services/Service';
import { addToken } from '../../store/tokens/actions';
import { useDispatch } from 'react-redux';
import './Login.css';
import GroupIcon from '@mui/icons-material/Group';
import { NoEncryption } from '@material-ui/icons';
import { styles } from './styles';
import comuLogo from '../../assets/images/logo.real.png';
import { toast } from 'react-toastify';
import useLocalStorage from 'react-use-localstorage';

function Login() {

  const classes = styles();
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

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
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
				position: 'bottom-left', // position? baixo esquerda
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
  }

  return (
    <>
      <Grid container direction='row' justifyContent='center' className='alignItems-center1'>
        <Grid item className='alignItems-center1 imagem' xs={12}>
          <Box className={classes.box}>
            <Grid container>
              <Grid item xs={12} sm={12} md={9} lg={4} xl={4}>
                <form onSubmit={onSubmit} className={classes.form} >
                  <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' >
                    <img className={classes.imagemLogo} src={comuLogo} alt="" />
                  </Typography>
                  <Grid container className='alignItems-center1' spacing={1}>
                    <Grid item xs={1}>
                      <GroupIcon />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField className='opacidade' value={usuarioLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth />
                    </Grid>
                  </Grid>
                  <Grid container className='alignItems-center1' spacing={2}>
                    <Grid item xs={1}>
                      <NoEncryption />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField value={usuarioLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                    </Grid>
                  </Grid>
                  <Box marginTop={2} textAlign='center' >
                    <button className="cta">
                      <span>Logar</span>
                      <svg viewBox="0 0 13 10" height="10px" width="15px">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </button>
                  </Box>
                  <Box marginTop={2}>
                    <Box marginRight={1}>
                      <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                    </Box>
                    <Typography variant='subtitle1' gutterBottom align='center'>
                      <Link to="/cadastrarusuario" className='decorator-none'>
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