function TableRow({ item, index, onDeleteClick, onEditClick }) {
  return (
    <tr>

      <td className="border p-2">{index + 1}</td>
      <td className="border p-2">{item.productName}</td>
      <td className="border p-2">{item.category}</td>
      <td className="border p-2">{item.price}</td>
      <td className="border p-2">{item.stock}</td>
      <td className="border p-2">{item.status}</td>

    {/* ACTIONS */}
<td className="border p-2 text-right">

  <button
    onClick={() => onEditClick(item)}
    className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
  >
    Edit
  </button>

  <button
    onClick={() => onDeleteClick(item._id)}
    className="bg-red-600 text-white px-2 py-1 rounded"
  >
    Delete
  </button>

</td>


    </tr>
  );
}

export default TableRow;
