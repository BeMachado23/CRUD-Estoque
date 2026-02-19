import { useState } from "react";
import QuantidadeControle from "./QuantidadeControle";
import ModalEditarProduto from "./ModalEditarProduto";

export interface Produto {
  id: number;
  nome: string;
  tipo: string;
  unidade: string;
  quantidade: number;
}

interface TabelaProdutosProps {
  produtos: Produto[];
  onUpdateQuantidade: (id: number, delta: number) => void;
  onSetQuantidade: (id: number, quantidade: number) => void;
  onEditarProduto: (produto: Produto) => void;
}

export default function TabelaProdutos({ produtos, onUpdateQuantidade, onSetQuantidade, onEditarProduto }: TabelaProdutosProps) {
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const handleAbrirModalEditar = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalEditarAberto(true);
  };

  const handleEditar = (produto: Produto) => {
    onEditarProduto(produto);
    setModalEditarAberto(false);
    setProdutoSelecionado(null);
  };

  return (
    <>
    <div className="overflow-hidden rounded-2xl shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-[#2C2C32] text-[#f5c518]">
            <th className="py-4 px-6 text-center font-semibold">Produto</th>
            <th className="py-4 px-6 text-center font-semibold">Tipo</th>
            <th className="py-4 px-6 text-center font-semibold">Unidade</th>
            <th className="py-4 px-6 text-center font-semibold">ID</th>
            <th className="py-4 pl-6 pr-2 text-center font-semibold">Qtd.</th>
            <th className="py-4 px-6"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {produtos.map((produto) => (
            <tr key={produto.id} className="border-b border-gray-200 last:border-b-0">
              <td className="py-4 px-6 text-center text-gray-800">{produto.nome}</td>
              <td className="py-4 px-6 text-center text-gray-800">{produto.tipo}</td>
              <td className="py-4 px-6 text-center text-gray-800">{produto.unidade}</td>
              <td className="py-4 px-6 text-center text-gray-800">#{produto.id}</td>
              <td className="py-4 pl-6 pr-2">
                <div className="flex justify-center">
                  <QuantidadeControle
                    quantidade={produto.quantidade}
                    onIncrement={() => onUpdateQuantidade(produto.id, 1)}
                    onDecrement={() => onUpdateQuantidade(produto.id, -1)}
                    onChange={(valor) => onSetQuantidade(produto.id, valor)}
                  />
                </div>
              </td>
              <td className="py-4 px-6 text-center">
                <button
                  onClick={() => handleAbrirModalEditar(produto)}
                  className="text-black hover:text-gray-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <ModalEditarProduto
      isOpen={modalEditarAberto}
      produto={produtoSelecionado}
      onClose={() => setModalEditarAberto(false)}
      onEditar={handleEditar}
    />
    </>
  );
}
