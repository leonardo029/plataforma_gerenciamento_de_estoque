import type {
  IPaginated,
  IStockCreatePayload,
  IStockDetail,
  IStockListItem,
  IStockUpdatePayload,
  IStockWithdrawPayload,
} from "@/interfaces";
import api from "../api";

export const getStocks = async (params?: {
  name?: string;
  page?: number;
  limit?: number;
}): Promise<IPaginated<IStockListItem>> => {
  try {
    const response = await api.get("/stock", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
    throw new Error("Failed to fetch stocks.");
  }
};

export const getStockById = async (id: string): Promise<IStockDetail> => {
  try {
    const response = await api.get(`/stock/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock details:", error);
    throw new Error("Failed to fetch stock details.");
  }
};

export const createStock = async (
  payload: IStockCreatePayload
): Promise<void> => {
  try {
    await api.post("/stock", payload);
  } catch (error) {
    console.error("Error creating stock:", error);
    throw new Error("Failed to create stock.");
  }
};

export const updateStock = async (
  id: string,
  payload: IStockUpdatePayload
): Promise<void> => {
  try {
    await api.patch(`/stock/${id}`, payload);
  } catch (error) {
    console.error("Error updating stock:", error);
    throw new Error("Failed to update stock.");
  }
};

export const withdrawStock = async (
  payload: IStockWithdrawPayload
): Promise<void> => {
  try {
    await api.post("/stock/withdraw", payload);
  } catch (error) {
    console.error("Error withdrawing stock:", error);
    throw new Error("Failed to withdraw stock.");
  }
};

export const deleteStock = async (id: string): Promise<void> => {
  try {
    await api.delete(`/stock/${id}`);
  } catch (error) {
    console.error("Error deleting stock:", error);
    throw new Error("Failed to delete stock.");
  }
};
