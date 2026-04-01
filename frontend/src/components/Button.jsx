function Button({ text, onClick, disabled = false, type = "submit" }) { // Change here: default "submit"
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        px-10 
        py-3
        rounded-full
        bg-slate-600                                    
        text-white text-sm font-medium
        hover:bg-slate-900
        hover:shadow-xl
        hover:ring-2 hover:ring-slate-400/40
        active:scale-95
        border border-white/40
        transition-all duration-200
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );
}

export default Button;