import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TokenState } from '../../store/tokens/tokensReducer';
import "./Home.css";

function Home(){

  let navigate = useNavigate();

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

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
    <div>
        <h1>Home</h1>
    </div>
  );
}

export { Home };