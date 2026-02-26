import { useState } from "react";

interface ModalCadastrarProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onCadastrar: (produto: { nome: string; tipo: string; unidade: string }) => void;
}

export default function ModalCadastrarProduto({ isOpen, onClose, onCadastrar }: ModalCadastrarProdutoProps) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [unidade, setUnidade] = useState("Un");
  const [nomeErro, setNomeErro] = useState("");
  const [tipoErro, setTipoErro] = useState("");
  const [unidadeErro, setUnidadeErro] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    let hasError = false;

    // Validar nome
    if (!nome.trim()) {
      setNomeErro("O nome do produto é obrigatório.");
      hasError = true;
    } else if (nome.length > 120) {
      setNomeErro("O nome do produto deve ter no máximo 120 caracteres.");
      hasError = true;
    } else {
      setNomeErro("");
    }

    // Validar tipo
    if (!tipo.trim()) {
      setTipoErro("O tipo do produto é obrigatório.");
      hasError = true;
    } else {
      setTipoErro("");
    }

    // Validar unidade
    if (!unidade) {
      setUnidadeErro("A unidade é obrigatória.");
      hasError = true;
    } else {
      setUnidadeErro("");
    }

    if (hasError) return;

    // Cadastrar produto
    onCadastrar({ nome, tipo, unidade });
    setNome("");
    setTipo("");
    setUnidade("Un");
    setNomeErro("");
    setTipoErro("");
    setUnidadeErro("");
    onClose();
  };

  const handleClose = () => {
    setNome("");
    setTipo("");
    setUnidade("Un");
    setNomeErro("");
    setTipoErro("");
    setUnidadeErro("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

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
                  Nome do produto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    if (nomeErro) setNomeErro("");
                  }}
                  maxLength={120}
                  className={`w-full bg-gray-200 rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-sm xl:text-base text-gray-800 outline-none focus:ring-2 ${nomeErro ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-[#f5c518]'}`}
                />
                {nomeErro && (
                  <p className="text-red-500 text-sm mt-1">{nomeErro}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{nome.length}/120 caracteres</p>
              </div>

              <div>
                <label className="block text-sm xl:text-base font-medium text-gray-800 mb-1.5 xl:mb-2">
                  Tipo de produto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={tipo}
                  onChange={(e) => {
                    setTipo(e.target.value);
                    if (tipoErro) setTipoErro("");
                  }}
                  maxLength={120}
                  className={`w-full bg-gray-200 rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-sm xl:text-base text-gray-800 outline-none focus:ring-2 ${tipoErro ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-[#f5c518]'}`}
                />
                {tipoErro && (
                  <p className="text-red-500 text-sm mt-1">{tipoErro}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{tipo.length}/120 caracteres</p>
              </div>
            </div>

            {/* Coluna direita */}
            <div className="w-full xl:w-40">
              <label className="block text-sm xl:text-base font-medium text-gray-800 mb-1.5 xl:mb-2">
                Unidade <span className="text-red-500">*</span>
              </label>
              <select
                value={unidade}
                onChange={(e) => {
                  setUnidade(e.target.value);
                  if (unidadeErro) setUnidadeErro("");
                }}
                className={`w-full bg-gray-200 rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-sm xl:text-base text-gray-800 outline-none focus:ring-2 cursor-pointer appearance-none bg-no-repeat bg-[length:16px_16px] bg-[position:right_12px_center] bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23374151%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] ${unidadeErro ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-[#f5c518]'}`}
              >
                <option value="Kg">Kg</option>
                <option value="Un">Un</option>
                <option value="L">L</option>
                <option value="m">m</option>
              </select>
              {unidadeErro && (
                <p className="text-red-500 text-sm mt-1">{unidadeErro}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 xl:mt-8">
            <button
              onClick={handleClose}
              className="px-5 py-2 xl:px-6 xl:py-2.5 text-sm xl:text-base font-medium text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-200 hover:border-gray-400 transition-colors"
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
