import {
  CreateProductType,
  ProductResponse,
  ProductType,
  UpdateProductType,
} from "@/lib/products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi ({
  reducerPath: 'ecommerceApi', 
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_ISHOP_BASE_URL}),
  tagTypes:["Products", "Product"],
  endpoints: (builder) => ({
    // getAllProductsr
    getAllProduct: builder.query<
      ProductResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `/products?page=${page}&size=${size}`,
      providesTags: ["Products"],
    }),

    // getProductByUuid
    getProductByUuid: builder.query<ProductType, string>({
      query: (uuid: string) => `/products/${uuid}`,
      providesTags: (result, error, uuid) => [{ type: "Product", id: uuid }],
    }),

    // create Product
    createProduct: builder.mutation<CreateProductType, unknown>({
      query: ({ newProduct, accessToken }) => ({
        url: `/products`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    // update product by uuid
    updateProduct: builder.mutation<
      UpdateProductType,
      {
        updateProduct: UpdateProductType | Partial<UpdateProductType>;
        uuid: string;
        accessToken: string;
      }
    >({
      query: ({ updateProduct, uuid, accessToken }) => ({
        url: `/products/${uuid}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        body: updateProduct,
      }),
      invalidatesTags: (result, error, { uuid }) => [
        "Products",
        { type: "Product", id: uuid },
      ],
    }),

    // delete product by uuid
    deleteProductByUUID: builder.mutation<
      string,
      { uuid: string; accessToken: string }
    >({
      query: ({ uuid, accessToken }) => ({
        url: `/products/${uuid}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }),
      invalidatesTags: (result, error, { uuid }) => [
        "Products",
        { type: "Product", id: uuid },
      ],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByUuidQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductByUUIDMutation,
} = ecommerceApi;
