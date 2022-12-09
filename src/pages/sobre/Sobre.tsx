import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import './Sobre.css';

function Sobre(){

  const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      navigate("/login")

    }
  }, [token])
  
  return(
    <>
      <h1>About</h1>
    </>
  );
}

export { Sobre };