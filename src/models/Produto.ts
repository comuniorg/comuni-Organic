import Categoria from "./Categoria";

interface Produto{
  id: number,
  nome: string,
  quantidade: number,
  data_ven: number,
  preco: number,
  categoria?: Categoria | null
}

export default Produto;