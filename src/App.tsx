import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from "./componentes/home/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/estaticos/navbar/Navbar';
import { Rodape } from './componentes/estaticos/rodape/Rodape';
import { About } from './componentes/about/About';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
      <Rodape/>
    </Router>
  );
}

export default App;
