import { useState } from "react";

interface ModalCadastrarProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onCadastrar: (produto: { nome: string; tipo: string; unidade: string }) => void;
}

export default function ModalCadastrarProduto({ isOpen, onClose, onCadastrar }: ModalCadastrarProdutoProps) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [unidade, setUnidade] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onCadastrar({ nome, tipo, unidade });
    setNome("");
    setTipo("");
    setUnidade("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl xl:max-w-3xl mx-4">
        {/* Header */}
        <div className="bg-[#2d2d2d] text-[#f5c518] font-semibold text-base xl:text-lg px-5 py-3 xl:px-6 xl:py-4 rounded-t-lg">
          Cadastro de produto
        </div>

        {/* Body */}
        <div className="p-5 xl:p-6">
          <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
            {/* Coluna esquerda */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm xl:text-base font-medium text-gray-800 mb-1.5 xl:mb-2">
                  Nome do produto
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-gray-200 rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-sm xl:text-base text-gray-800 outline-none focus:ring-2 focus:ring-[#f5c518]"
                />
              </div>

              <div>
                <label className="block text-sm xl:text-base font-medium text-gray-800 mb-1.5 xl:mb-2">
                  Tipo de produto
                </label>
                <input
                  type="text"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full bg-gray-200 rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-sm xl:text-base text-gray-800 outline-none focus:ring-2 focus:ring-[#f5c518]"
                />
              </div>
            </div>

            {/* Coluna direita */}
            <div className="w-full xl:w-40">
              <label className="block text-sm xl:text-base font-medium text-gray-800 mb-1.5 xl:mb-2">
                Unidade
              </label>
              <select
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-sm xl:text-base text-gray-800 outline-none focus:ring-2 focus:ring-[#f5c518] cursor-pointer"
              >
                <option value="">Unidade</option>
                <option value="Kg">Kg</option>
                <option value="Un">Un</option>
                <option value="L">L</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 xl:mt-8">
            <button
              onClick={onClose}
              className="px-5 py-2 xl:px-6 xl:py-2.5 text-sm xl:text-base font-medium text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 xl:px-6 xl:py-2.5 text-sm xl:text-base font-medium text-black bg-[#f5c518] rounded-md hover:bg-[#e0b000] transition-colors"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
