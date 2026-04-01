function InputField({ label, type, value, onChange, error,submitCount}) {
  return (
    <>
      {/* INLINE KEYFRAMES */}
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-6px); }
            80% { transform: translateX(6px); }
          }
        `}
      </style>

      <div
        
  key={submitCount} 
  className="mb-4"
  style={{
    animation: error? "shake 0.4s ease-in-out" : "none",
  }}
>
        {/* Label */}
        <label className="mb-1 block text-base font-semibold text-stone-950">
          {label}
        </label>

        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="
            w-full
            rounded-lg
            border border-white/30
            bg-white/20
            px-4 py-2.5
            text-base text-gray-100
            placeholder-slate-100
            backdrop-blur
            focus:outline
            focus:border-gray-950
            focus:ring-1 focus:ring-indigo-600
          "
        />

        {/* Error */}
        {error && (
          <p className="mt-1 text-xs font-medium text-red-500 drop-shadow">

            {error}
          </p>
        )}
      </div>
    </>
  );
}

export default InputField;
