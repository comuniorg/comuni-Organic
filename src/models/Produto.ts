import Categoria from "./Categoria";
import UsuarioLogin from "./UsuarioLogin";

interface Produto{
  id: number,
  nome: string,
  quantidade: number,
  foto: string,
  preco: number,
  categoria: Categoria | null,
  usuario: UsuarioLogin | null
}

export default Produto;