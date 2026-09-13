import { apiClient } from "../../../services/api-client";

export type StockBalance = {
  id: string;
  productId: string;
  warehouseId: string;
  shelfId: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
};

export const inventoryService = {
  list(filters: { warehouseId?: string; shelfId?: string; productId?: string } = {}) {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => value && query.set(key, value));
    return apiClient<StockBalance[]>(`/stock?${query}`);
  },
  receive(payload: unknown) {
    return apiClient("/receipts", { method: "POST", body: JSON.stringify(payload) });
  },
  dispatch(payload: unknown) {
    return apiClient("/dispatches", { method: "POST", body: JSON.stringify(payload) });
  },
  transfer(payload: unknown) {
    return apiClient("/transfers", { method: "POST", body: JSON.stringify(payload) });
  },
  count(payload: unknown) {
    return apiClient("/stock-counts", { method: "POST", body: JSON.stringify(payload) });
  },
};
