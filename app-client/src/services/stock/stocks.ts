import type { IPaginated, IStockCreatePayload, IStockDetail, IStockListItem, IStockUpdatePayload, IStockWithdrawPayload } from "@/interfaces";
import api from "../api";

export async function getStocks(params?: {
  name?: string;
  page?: number;
  limit?: number;
}): Promise<IPaginated<IStockListItem>> {
  const { data } = await api.get<IPaginated<IStockListItem>>("/stock", {
    params,
  });
  return data;
}

export async function getStockById(id: string): Promise<IStockDetail> {
  const { data } = await api.get<IStockDetail>(`/stock/${id}`);
  return data;
}

export async function createStock(payload: IStockCreatePayload): Promise<void> {
  await api.post<void>("/stock", payload);
}

export async function updateStock(
  id: string,
  payload: IStockUpdatePayload
): Promise<void> {
  await api.patch<void>(`/stock/${id}`, payload);
}

export async function withdrawStock(
  payload: IStockWithdrawPayload
): Promise<void> {
  await api.post<void>("/stock/withdraw", payload);
}

export async function deleteStock(id: string): Promise<void> {
  await api.delete<void>(`/stock/${id}`);
}
