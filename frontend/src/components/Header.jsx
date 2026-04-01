function Header({ category, onCategoryChange, search, onSearchChange, onAddClick }) {
  return (
    <div className="w-6xl mb-8 pl-8 pr-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Products
      </h1>

      {/* CONTROLS ROW */}
      <div className="flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">

          {/* CATEGORY */}
          <select
            value={category}
            onChange={onCategoryChange}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="electronic">Electronic</option>
            <option value="clothing">Clothing</option>
            <option value="cell">Cell</option>
            <option value="Furniture">Furniture</option>
          </select>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={onSearchChange}
            className="border border-gray-300 px-4 py-2 rounded-lg w-64"
          />

        </div>

        {/* RIGHT SIDE */}
        <button
          onClick={onAddClick}
          className="bg-slate-800 text-white px-5 py-2 rounded-lg hover:bg-slate-900"
        >
          + Add Product
        </button>

      </div>

    </div>
  );
}

export default Header;
