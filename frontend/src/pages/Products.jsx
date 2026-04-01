// this file handle the all the product related operations like add, edit, delete, list

import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import ProductTable from "../components/table/ProductTable";
import ProductForm from "../components/ProductForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import {
  useGetProductsQuery,
  useDeleteProductMutation
} from "../services/productApi";

function Products() {

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState(null);

  // ✅ SEARCH PARAM ADDED HERE
  const { data, isLoading, refetch } = useGetProductsQuery({
    page,
    category,
    search
  });

  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId).unwrap();
      setShowDelete(false);
      refetch();
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10 bg-gradient-to-br from-gray-200 to-gray-300 min-h-screen">

      {/* HEADER */}
      <Header
        category={category}
        onCategoryChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
        search={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // ✅ RESET PAGE WHEN SEARCH
        }}
        onAddClick={() => {
          setEditData(null);
          setShowForm(true);
        }}
      />

      {/* TABLE */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-lg border border-gray-200">

        {/* ❌ FRONTEND FILTER REMOVED */}
        <ProductTable
          products={products}
          onDeleteClick={(id) => {
            setDeleteId(id);
            setShowDelete(true);
          }}
          onEditClick={(product) => {
            setEditData(product);
            setShowForm(true);
          }}
        />

      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex justify-center items-center gap-2">

        {/* Previous */}
        <div className="w-32">
          <Button
            text="Previous"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />
        </div>

        {/* PAGE NUMBERS */}
        <div className="flex gap-2">

          {totalPages <= 5 &&
            Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`
                    px-6 py-2
                    rounded-full
                    text-white text-sm font-medium
                    border border-white/40
                    transition-all duration-200
                    active:scale-95
                    ${
                      page === pageNumber
                        ? "bg-slate-900 shadow-xl ring-2 ring-slate-400/40"
                        : "bg-slate-600 hover:bg-slate-900 hover:shadow-xl hover:ring-2 hover:ring-slate-400/40"
                    }
                  `}
                >
                  {pageNumber}
                </button>
              );
            })}

          {totalPages > 5 && (
            <>
              {page > 3 && (
                <>
                  <button
                    onClick={() => setPage(1)}
                    className="px-6 py-2 rounded-full bg-slate-600 text-white"
                  >
                    1
                  </button>
                  <span>...</span>
                </>
              )}

              {Array.from({ length: 5 }, (_, i) => {
                const pageNumber = page - 2 + i;
                if (pageNumber < 1 || pageNumber > totalPages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`
                      px-6 py-2
                      rounded-full
                      text-white text-sm font-medium
                      border border-white/40
                      transition-all duration-200
                      ${
                        page === pageNumber
                          ? "bg-slate-900 shadow-xl ring-2 ring-slate-400/40"
                          : "bg-slate-600 hover:bg-slate-900"
                      }
                    `}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {page < totalPages - 2 && (
                <>
                  <span>...</span>
                  <button
                    onClick={() => setPage(totalPages)}
                    className="px-6 py-2 rounded-full bg-slate-600 text-white"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </>
          )}

        </div>

        {/* Next */}
        <div className="w-32">
          <Button
            text="Next"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          />
        </div>

      </div>

      {/* PRODUCT FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <ProductForm
            onCancel={() => setShowForm(false)}
            onSuccess={refetch}
            editData={editData}
          />
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <ConfirmDeleteModal
            onCancel={() => setShowDelete(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}

    </div>
  );
}

export default Products;
