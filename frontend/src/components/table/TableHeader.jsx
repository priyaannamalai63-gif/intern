function TableHeader() {
  return (
    <thead className="bg-slate-700 text-white">
      <tr>
        <th className="border p-3 font-semibold">S.No</th>
        <th className="border p-3 font-semibold">Name</th>
        <th className="border p-3 font-semibold">Category</th>
        <th className="border p-3 font-semibold">Price</th>
        <th className="border p-3 font-semibold">Stock</th>
        <th className="border p-3 font-semibold">Status</th>
        <th className="border p-3 font-semibold">Actions</th>
      </tr>
    </thead>
  );
}
export default TableHeader;
