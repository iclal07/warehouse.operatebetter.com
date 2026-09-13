import { apiClient } from "../../../services/api-client";
import type { Product, ProductFilters } from "../types/product.types";
import type { ProductFormValues } from "../forms/product.schema";

type Paginated<T> = { data: T[]; meta: { total: number; page: number; limit: number; pages: number } };

export const productsService = {
  list(filters: ProductFilters = {}) {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") query.set(key, String(value));
    });
    return apiClient<Paginated<Product>>(`/products?${query}`);
  },
  detail(id: string) {
    return apiClient<Product>(`/products/${id}`);
  },
  create(values: ProductFormValues) {
    return apiClient<Product>("/products", { method: "POST", body: JSON.stringify(values) });
  },
};
