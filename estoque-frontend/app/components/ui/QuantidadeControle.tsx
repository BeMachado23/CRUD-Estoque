interface QuantidadeControleProps {
  quantidade: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange?: (valor: number) => void;
}

export default function QuantidadeControle({ quantidade, onIncrement, onDecrement, onChange }: QuantidadeControleProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(e.target.value, 10);
    if (!isNaN(valor) && valor >= 0 && onChange) {
      onChange(valor);
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
        value={quantidade}
        onChange={handleChange}
        className="w-10 h-5 xl:w-12 xl:h-6 text-center text-xs xl:text-sm border border-gray-300 rounded bg-white outline-none focus:ring-1 focus:ring-[#f5c518] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
