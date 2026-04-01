import TableHeader from "./TableHeader";

function ProductTable({ products, onDeleteClick, onEditClick }) {
  return (
    <table className="w-full border border-gray-300 rounded-2xl overflow-hidden bg-gray-200">

      <TableHeader />

      <tbody>
        {products.map((p, index) => (
          <tr
            key={p._id}
            className="text-center border-t hover:bg-gray-300 transition"
          >
            <td className="py-3">{index + 1}</td>
            <td className="py-3">{p.productName}</td>
            <td className="py-3">{p.category}</td>
            <td className="py-3">{p.price}</td>
            <td className="py-3">{p.stock}</td>
            <td className="py-3">{p.status}</td>

       <td className="py-3 flex justify-center items-center gap-4">

  {/* EDIT */}
  <button
    onClick={() => onEditClick(p)}
    className="text-red-600 underline hover:text-red-800 font-medium"
  >
    Edit
  </button>

  {/* DELETE (TRASH ICON) */}
  <button
    onClick={() => onDeleteClick(p._id)}
    className="text-red-600 hover:text-red-800 text-xl"
    title="Delete"
  >
    🗑️
  </button>

</td>


          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default ProductTable;
