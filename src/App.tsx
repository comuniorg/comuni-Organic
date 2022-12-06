import React from 'react';
import './App.css';
import { Home } from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/estaticos/navbar/Navbar';
import { Rodape } from './componentes/estaticos/rodape/Rodape';
import { Sobre } from './pages/sobre/Sobre';
import { Produtos } from './pages/produtos/Produtos';
import { Login } from './pages/login/Login';
import CadastrarUsuario from './pages/cadastrarusuario/CadastrarUsuario';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/sobre' element={<Sobre/>} />
        <Route path='/produtos' element={<Produtos/>} />
        <Route path="/cadastrarusuario" element={<CadastrarUsuario/>} />
      </Routes>
      <Rodape/>
    </Router>
  );
}

export default App;
