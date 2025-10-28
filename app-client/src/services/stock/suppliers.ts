import type { ISupplierListItem } from "@/interfaces";
import api from "../api";

export const getSuppliers = async (): Promise<ISupplierListItem[]> => {
  try {
    const response = await api.get("/supplier");
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw new Error("Failed to fetch suppliers.");
  }
};
