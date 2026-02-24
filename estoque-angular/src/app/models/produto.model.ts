export interface Produto{
  id: number;
  nome: string;
  tipo: string;
  unidade: string;
  quantidade: number;
}

export interface PaginacaoResponse{
  content: Produto[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ProdutoRequest{
  nome: string;
  tipo: string;
  unidade: string;
  quantidade: number;
}
