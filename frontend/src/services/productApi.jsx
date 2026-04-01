import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["Products"],
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({

    // ✅ GET PRODUCTS WITH SEARCH
    getProducts: builder.query({
      query: ({ page, category, search }) => {

        let url = `/products?page=${page}`;

        if (category) url += `&category=${category}`;
        if (search) url += `&search=${search}`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Products"],
    }),

  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
