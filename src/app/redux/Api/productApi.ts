import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./productTypes";

interface GetProductResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/products" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // Get products with optional pagination and search
    getProducts: builder.query<
      GetProductResponse,
      { page?: number; limit?: number; search?: string } | void
    >({
      query: (params) => {
        const page = params?.page;
        const limit = params?.limit ?? 8;
        const search = params?.search?.trim() || "";

        // ✅ query string বানানো
        const queryString = new URLSearchParams();
        if (page) queryString.append("page", page.toString());
        if (limit) queryString.append("limit", limit.toString());
        if (search) queryString.append("search", search);

        // ✅ endpoint path
        return `/?${queryString.toString()}`;
      },
      providesTags: ["Product"],
    }),

    // Get a single product by ID
    getProductById: builder.query<Product, string>({
      query: (id) => `/${id}`,
      providesTags: ["Product"],
    }),

    // Add new product
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update product
    updateProduct: builder.mutation<
      Product,
      { id: string; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // Delete product
    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
