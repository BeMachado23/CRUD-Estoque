interface ActionButtonProps {
  children: React.ReactNode;
  icon: "plus" | "minus";
  onClick?: () => void;
}

export default function ActionButton({ children, icon, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 xl:gap-2 bg-[#f5c518] hover:bg-[#e0b000] text-black font-semibold text-sm xl:text-base px-4 py-1.5 xl:px-5 xl:py-2 rounded-full transition-colors"
    >
      {children}
      <span className="flex items-center justify-center w-5 h-5 xl:w-6 xl:h-6 text-xs xl:text-sm rounded-full bg-white text-black">
        {icon === "plus" ? "+" : "−"}
      </span>
    </button>
  );
}
