import { useState, useEffect } from "react";

interface QuantidadeControleProps {
  quantidade: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange?: (valor: number) => void;
}

export default function QuantidadeControle({ quantidade, onIncrement, onDecrement, onChange }: QuantidadeControleProps) {
  const [valorLocal, setValorLocal] = useState(quantidade);

  // Atualizar valor local quando quantidade externa mudar
  useEffect(() => {
    setValorLocal(quantidade);
  }, [quantidade]);

  // Debounce: atualizar no backend após 500ms de inatividade
  useEffect(() => {
    if (valorLocal === quantidade) return; // Não fazer nada se não mudou

    const timeoutId = setTimeout(() => {
      if (onChange) {
        onChange(valorLocal);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [valorLocal, quantidade, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(e.target.value, 10);
    if (!isNaN(valor) && valor >= 0) {
      setValorLocal(valor);
    }
  };

  return (
    <div className="flex items-center gap-0.5 xl:gap-1 ">
      <button
        onClick={onIncrement}
        className="flex items-center justify-center w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-[#f5c518] hover:bg-[#e0b000] text-black font-bold text-xs xl:text-sm transition-colors"
      >
        +
      </button>
      <input
        type="number"
        min="0"
        value={valorLocal}
        onChange={handleChange}
        className="w-10 h-5 xl:w-12 xl:h-6 text-center text-xs xl:text-sm text-black border border-gray-300 rounded bg-white outline-none focus:ring-1 focus:ring-[#f5c518] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        onClick={onDecrement}
        className="flex items-center justify-center w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-[#f5c518] hover:bg-[#e0b000] text-black font-bold text-xs xl:text-sm transition-colors"
      >
        −
      </button>
    </div>
  );
}
