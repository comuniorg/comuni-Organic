import { Box, Button, Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import './Sobre.css';
import Carol from './imagens/Caroline.png';
import Daniel from './imagens/Daniel.png';
import Murilo from './imagens/Murilo.png';
import Nicole from './imagens/Nicole.png';
import Maycon from './imagens/Maycon.png';
import Hugo from './imagens/Hugo.jpg';



function Sobre() {

  return (
    <>
      <h1>Sobre Nós</h1>
      <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}>
            <Typography variant="h5" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Quem Somos?</Typography>
            <Typography variant="h6" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>Somos um e-commerce criado para facilitar a comunicação e comércio entre Agricultores Familiares e Associações de comunidades carentes do estado do RJ. </Typography>
            <br />
            <Typography variant="h5" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Missão</Typography>
            <Typography variant="h6" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>A plataforma foi desenvolvida alinhada com a cartilha de Objetivos de Desenvolvimento Sustentável da ONU, mais especificamente com a ODS 2 - Fome Zero e Agricultura Sustentável. Desta forma, visa acessibilizar a alimentação orgânica para comunidades carentes e fomentar a economia local. </Typography>
            <br />
            <Typography variant="h5" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Nossos Colaboradores</Typography>
            <Grid item xs={2}>
              <img src={Carol} alt="" width='274px'/>
              <img src={Daniel} alt="" width='300px'/>
              <img src={Maycon} alt="" width='300px'/>
              <img src={Nicole} alt="" width='300px'/>
              <img src={Murilo} alt="" width='300px'/>
              <img src={Hugo} alt="" width='300px'/>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export { Sobre };