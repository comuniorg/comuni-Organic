import React from 'react';
import { Button, Grid, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound(){
  return(
    <>
      <Grid container direction='column' justifyContent='center' className='backNot alignItems-center' style={{minHeight: 'calc(100vh - 148px)' }}>
        <h1 className='erro'>404</h1>
        <h2>OPS! NÃO ENCONTRAMOS ESSA PÁGINA</h2>

        <Link to='/login' className='text-decorator-none'>
          <Button variant="contained" color="primary">
            Página Principal
          </Button>
        </Link>
      </Grid>
    </>
  );
}

export { NotFound };