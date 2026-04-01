function ConfirmDeleteModal({ onCancel, onConfirm }) {
  return (
    <div className="bg-gray-300 p-8 rounded-2xl shadow-xl w-[350px]">

      {/* Title */}
      <h3 className="text-xl font-semibold text-center text-slate-800 mb-6">
        Are you sure you want to delete?
      </h3>

      {/* Buttons */}
      <div className="flex justify-center gap-4">

        {/* Delete */}
        <button
          onClick={onConfirm}
          className="
            bg-red-600 
            hover:bg-red-700
            text-white 
            px-6 py-2 
            rounded-lg 
            transition
          "
        >
          Delete
        </button>

        {/* Cancel */}
        <button
          onClick={onCancel}
          className="
            bg-slate-700
            hover:bg-slate-900
            text-white
            px-6 py-2
            rounded-lg
            transition
          "
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default ConfirmDeleteModal;
