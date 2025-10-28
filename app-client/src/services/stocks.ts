import api from './api'

export type StockListItem = {
  id: string;
  batch: string;
  expiration_date: string; // ISO date string
  cost_price: number;
  sale_price: number;
  stock_quantity: number;
  product: { name: string; identification_code: string };
};

export type StockDetail = {
  id: string;
  batch: string;
  expiration_date: string; // ISO date string
  cost_price: number;
  sale_price: number;
  stock_quantity: number;
  is_activated: boolean;
  product: {
    id: string;
    name: string;
    identification_code: string;
    description: string;
    brand: { id: string; name: string };
    category: { id: string; name: string };
    unit_of_measurement: string;
  };
  supplier: { id: string; name: string; email: string };
  stock_location: {
    shelf: { id: string; name: string };
    corridor: { id: string; name: string };
    section: { id: string; name: string };
  };
};

export type StockCreatePayload = {
  product_id: string;
  batch: string;
  expiration_date: string;
  cost_price: number;
  sale_price: number;
  supplier_id: string;
  stock_quantity: number;
  isActivated: boolean;
  stock_location: { shelf_id: string; corridor_id: string; section_id: string };
};

export type StockUpdatePayload = Partial<{
  batch: string;
  cost_price: number;
  sale_price: number;
  supplier_id: string;
  stock_quantity: number;
  stock_location: Partial<{ shelf_id: string; corridor_id: string; section_id: string }>;
}>;

export type StockWithdrawPayload = {
  stock_id: string;
  stock_quantity: number;
};

export type Paginated<T> = { items: T[]; total: number; page: number; limit: number }

export async function getStocks(params?: { name?: string; page?: number; limit?: number }): Promise<Paginated<StockListItem>> {
  const { data } = await api.get<Paginated<StockListItem>>('/stock', { params });
  return data;
}

export async function getStockById(id: string): Promise<StockDetail> {
  const { data } = await api.get<StockDetail>(`/stock/${id}`);
  return data;
}

export async function createStock(payload: StockCreatePayload): Promise<void> {
  await api.post<void>('/stock', payload);
}

export async function updateStock(id: string, payload: StockUpdatePayload): Promise<void> {
  await api.patch<void>(`/stock/${id}`, payload);
}

export async function withdrawStock(payload: StockWithdrawPayload): Promise<void> {
  await api.post<void>('/stock/withdraw', payload);
}

export async function deleteStock(id: string): Promise<void> {
  await api.delete<void>(`/stock/${id}`);
}