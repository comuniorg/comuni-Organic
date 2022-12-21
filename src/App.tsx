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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CadastroProduto from './componentes/produtos/cadastroproduto/CadastroProduto';
import DeletarProduto from './componentes/produtos/deletarproduto/DeletarProduto';
import CadastroCategoria from './componentes/categoria/cadastrocategoria/CadastroCategoria';
import ListaCategorias from './componentes/categoria/listacategorias/ListaCategorias';
import DeletarCategoria from './componentes/categoria/deletarcategoria/DeletarCategoria';
import { NotFound } from './pages/notfound/NotFound';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Navbar/>
        <div style={{minHeight: 'calc(100vh - 144px)'}}>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/sobre' element={<Sobre/>} />
            <Route path='/produtos' element={<ListaProdutos/>} />
            <Route path='/categorias' element={<ListaCategorias/>} />
            <Route path="/cadastrarusuario" element={<CadastrarUsuario/>} />
            <Route path="/formularioproduto" element={<CadastroProduto/>} />
            <Route path="/formulariocategoria" element={<CadastroCategoria/>} />
            <Route path="/formularioproduto/:id" element={<CadastroProduto/>} />
            <Route path="/formulariocategoria/:id" element={<CadastroCategoria/>} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto/>} />
            <Route path="/deletarcategoria/:id" element={<DeletarCategoria/>} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </div>
        <Rodape/>
      </Router>
    </Provider>
  );
}

export { App };
