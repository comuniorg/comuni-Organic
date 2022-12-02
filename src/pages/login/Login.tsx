import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid alignItems='center' xs={12} sm={9} md={6}>
          <Box paddingX={10} sx={{ my: 10 }}>
            <form>
              <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
              <TextField id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth />
              <TextField id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
              <Box marginTop={2} textAlign='center'>
                <Link to='/home' className='text-decorator-none'>
                  <Button type='submit' variant='contained' color='primary'>
                    Logar
                  </Button>
                </Link>
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