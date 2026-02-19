
import { useState } from "react";

interface ModalExcluirProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onExcluir: (id: number) => void;
}

export default function ModalExcluirProduto({ isOpen, onClose, onExcluir }: ModalExcluirProdutoProps) {
  const [nomeItem, setNomeItem] = useState("");
  const [id, setId] = useState("");
  const [confirmeId, setConfirmeId] = useState("");

  if (!isOpen) return null;

  const handleExcluir = () => {
    if (id && id === confirmeId) {
      onExcluir(Number(id));
      setNomeItem("");
      setId("");
      setConfirmeId("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md xl:max-w-lg mx-4">
        {/* Header */}
        <div className="bg-[#2d2d2d] text-[#f5c518] font-semibold text-base xl:text-lg px-5 py-3 xl:px-6 xl:py-4 rounded-t-lg">
          Excluir
        </div>

        {/* Body */}
        <div className="p-5 xl:p-6">
          {/* Nome do item */}
          <div className="mb-4">
            <label className="block text-sm xl:text-base font-medium text-gray-800 mb-1.5 xl:mb-2">
              Nome do item
            </label>
            <input
              type="text"
              value={nomeItem}
              onChange={(e) => setNomeItem(e.target.value)}
              className="w-full bg-gray-200 rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-sm xl:text-base text-gray-800 outline-none focus:ring-2 focus:ring-[#f5c518]"
            />
          </div>

          {/* ID e Confirme ID */}
          <div className="flex gap-4 xl:gap-6 mb-6">
            <div className="flex-1">
              <label className="block text-sm xl:text-base font-medium text-gray-800 mb-1.5 xl:mb-2">
                ID
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-sm xl:text-base text-gray-800 outline-none focus:ring-2 focus:ring-[#f5c518]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm xl:text-base font-medium text-gray-800 mb-1.5 xl:mb-2">
                Confirme ID
              </label>
              <input
                type="text"
                value={confirmeId}
                onChange={(e) => setConfirmeId(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-sm xl:text-base text-gray-800 outline-none focus:ring-2 focus:ring-[#f5c518]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 xl:px-6 xl:py-2.5 text-sm xl:text-base font-medium text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleExcluir}
              className="px-5 py-2 xl:px-6 xl:py-2.5 text-sm xl:text-base font-medium text-black bg-[#f5c518] rounded-md hover:bg-[#e0b000] transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
