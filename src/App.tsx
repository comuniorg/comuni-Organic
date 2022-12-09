import React from 'react';
import './App.css';
import { Home } from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/estaticos/navbar/Navbar';
import { Rodape } from './componentes/estaticos/rodape/Rodape';
import { Sobre } from './pages/sobre/Sobre';
import { Login } from './pages/login/Login';
import CadastrarUsuario from './pages/cadastrarusuario/CadastrarUsuario';
import { ListaProdutos } from './componentes/produtos/listaprodutos/ListaProdutos';

function App() {
  return (
    <Router>
      <Navbar/>
      <div style={{minHeight: '100vh'}}>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/sobre' element={<Sobre/>} />
          <Route path='/produtos' element={<ListaProdutos/>} />
          <Route path="/cadastrarusuario" element={<CadastrarUsuario/>} />
        </Routes>
      </div>
      <Rodape/>
    </Router>
  );
}

export default App;
