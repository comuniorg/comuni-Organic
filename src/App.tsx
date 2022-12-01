import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/estaticos/navbar/Navbar';
import { Rodape } from './componentes/estaticos/rodape/Rodape';
import { Sobre } from './pages/sobre/Sobre';
import { Produtos } from './pages/produtos/Produtos';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/sobre' element={<Sobre/>} />
        <Route path='/produtos' element={<Produtos/>} />
      </Routes>
      <Rodape/>
    </Router>
  );
}

export default App;
