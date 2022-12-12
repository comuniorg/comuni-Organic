import Categoria from "./Categoria";

interface Produto{
  id: number,
  nome: string,
  quantidade: number,
  foto: string,
  preco: number,
  categoria?: Categoria | null
}

export default Produto;