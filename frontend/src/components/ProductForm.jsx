import { useEffect, useState } from "react";
import {
  useCreateProductMutation,
  useUpdateProductMutation
} from "../services/productApi";


function ProductForm({ onCancel, onSuccess, editData }) {

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [status, setStatus] = useState("active");
  const [createProduct] = useCreateProductMutation();
const [updateProduct] = useUpdateProductMutation();


  useEffect(() => {
    if (editData) {
      setProductName(editData.productName);
      setCategory(editData.category);
      setPrice(editData.price);
      setStock(editData.stock);
      setProductDetails(editData.productDetails);
      setStatus(editData.status);
    }
  }, [editData]);

  const handleSave = async () => {

  try {

    if (editData) {

      await updateProduct({
        id: editData._id,
        data: {
          productName,
          category,
          price,
          stock,
          productDetails,
          status
        }
      }).unwrap();

      alert("Product Updated");

    } else {

      await createProduct({
        productName,
        category,
        price,
        stock,
        productDetails,
        status
      }).unwrap();

      alert("Product Added");
    }

    onSuccess();
    onCancel();

  } catch (error) {
    alert(error?.data?.message || "Something went wrong");
  }
};

  return (
   <div className="bg-gray-300 p-8 rounded-2xl shadow-xl w-[400px]">


      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
        {editData ? "Edit Product" : "Add Product"}
      </h2>

      <input
        className="border border-gray-300 bg-gray-100 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <input
        className="border border-gray-300 bg-gray-100 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="border border-gray-300 bg-gray-100 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="border border-gray-300 bg-gray-100 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <textarea
        className="border border-gray-300 bg-gray-100 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
        placeholder="Description"
        rows="3"
        value={productDetails}
        onChange={(e) => setProductDetails(e.target.value)}
      />

      <select
        className="border border-gray-300 bg-gray-100 rounded-lg p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-slate-400"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <div className="flex justify-end gap-3">

        <button
          onClick={handleSave}
          className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-lg"
        >
          Save
        </button>

      <button
  onClick={onCancel}
  className="bg-gray-100 hover:bg-gray-200 text-black font-medium px-6 py-2 rounded-lg border border-gray-300"
>
  Cancel
</button>


      </div>

    </div>
  );
}

export default ProductForm;
