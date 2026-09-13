export type ProductStatus = "ACTIVE" | "PASSIVE";

export type Product = {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  category: { id: string; name: string };
  unit: string;
  minimumStock: number;
  totalStock: number;
  isCritical: boolean;
  status: ProductStatus;
};

export type ProductFilters = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  warehouseId?: string;
  stockStatus?: "all" | "critical" | "out";
};
