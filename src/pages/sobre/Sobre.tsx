import { Box, Button, Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import './Sobre.css';
import Carol from './imagens/Carol.png';
import Daniel from './imagens/Daniel.png';
import Murilo from './imagens/Murilo.png';
import Nicole from './imagens/Nicole.png';
import Maycon from './imagens/Maycon.png';
import Hugo from './imagens/Hugo.png';
import Jean from './imagens/Jean.png';

function Sobre(){

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )
  
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado', {
        position: 'top-right', // position? topo direita
        autoClose: 2000, // Fechar automaticamente? após 2 segundos
        hideProgressBar: false, // não mostrar o progresso? mostrar
        closeOnClick: true, // fechar após o click? sim
        pauseOnHover: false, // pausar quando o usuário mover o mouse? não
        draggable: false, // permitir mover a notificação do local? não
        theme: 'light', // tema? light
        progress: undefined // 
      });
      navigate("/login")
    }
  }, [token])
  
  return(
    <>
      <h1></h1>
      <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}>
            <Typography variant="h5" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Quem Somos?</Typography>
            <Typography variant="h6" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>Somos um e-commerce criado para facilitar a comunicação e comércio entre Agricultores Familiares e Associações de comunidades carentes do estado do RJ. </Typography>
            <br />
            <br />
            <Typography variant="h5" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Missão</Typography>
            <Typography variant="h6" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>A plataforma foi desenvolvida alinhada com a cartilha de Objetivos de Desenvolvimento Sustentável da ONU, mais especificamente com a ODS 2 - Fome Zero e Agricultura Sustentável. Desta forma, visa acessibilizar a alimentação orgânica para comunidades carentes e fomentar a economia local. </Typography>
            <br />
            <br />
            <Typography variant="h5" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Nossos Colaboradores</Typography>
            <br />
          </Box>
        </Grid>
        <Grid item container xs={12} >
              <a href='https://www.linkedin.com/in/caroline-barcelos-valente-42091a15a/' target='_blank'>
              <img src={Carol} alt="" width='180px' />
              </a>

              <a href='https://www.linkedin.com/in/danielcorrea5/' target='_blank'>
              <img src={Daniel} alt="" width='180px'/>
              </a>

              <a href='https://www.linkedin.com/in/maycon-silva-4673ba234/' target='_blank'>
              <img src={Maycon} alt="" width='180px' />
              </a>

              <a href='https://www.linkedin.com/in/nicole-moreira-da-silva-4aa171234/' target='_blank'>
              <img src={Nicole} alt="" width='180px' />
              </a>

              <a href='https://www.linkedin.com/in/murilo-nascimento-0388b4249/' target='_blank'>
              <img src={Murilo} alt="" width='180px'/>
              </a>

              <a href='https://www.linkedin.com/in/hugo-ramos-84a76924a/' target='_blank'>
              <img src={Hugo} alt="" width='180px'/>
              </a>
              
              <a href='https://www.linkedin.com/in/jeangs/' target='_blank'>
              <img src={Jean} alt="" width='180px'/>
              </a>
            </Grid>
      </Grid>
    </>
  )
}

export { Sobre };