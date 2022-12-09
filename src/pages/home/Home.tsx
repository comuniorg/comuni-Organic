import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import "./Home.css";

function Home(){

  const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
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