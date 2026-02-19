interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center bg-white rounded-full px-3 py-1.5 w-56 xl:px-4 xl:py-2 xl:w-64">
      <input
        type="text"
        placeholder="Pesquise o produto aqui..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 outline-none text-xs xl:text-sm text-gray-700 bg-transparent"
      />
      <button className="ml-2 text-gray-600 hover:text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 xl:h-5 xl:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}
