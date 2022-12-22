import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TokenState } from '../../store/tokens/tokensReducer';
import "./Home.css";
import VerdeNovo from './imagens/verdeNovo.png'

function Home() {

  let navigate = useNavigate();

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  useEffect(() => {
    if (token == "") {
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
      navigate("/login")
    }
  }, [token])

  return (
    <div className='ta-center cor-fundo' style={{minHeight: 'calc(100vh - 148px)'}}>
      <img src={VerdeNovo} alt="" className='w-50' />
      <Grid container spacing={1} justifyContent='center' xs={12}>
        <Grid item>
          <div className="card">
            <div className="card-img"></div>
            <div className="card-info">
              <p className="text-body">Alimentos de Agricultura Familiar</p>
              <p className="text-title"></p>
            </div>
          </div>
        </Grid>
        <Grid item>
          <div className="card">
            <div className="card_img"></div>
            <div className="card_info">
              <p className="text_body">Alimentos Frescos</p>
              <Link to='/sobre'>
                <p className="text_title">Saiba Mais</p>
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item>
          <div className="card">
            <div className="card--img"></div>
            <div className="card--info">
              <p className="text--body">Alimentos Orgâncios a Preços Acessíveis</p>
              <p className="text--title"></p>
            </div>
          </div>
        </Grid>
      </Grid>

    </div>

  );
}

export { Home };