import type { ISupplierListItem } from "@/interfaces";
import api from "../api";

export async function getSuppliers(): Promise<ISupplierListItem[]> {
  const { data } = await api.get<ISupplierListItem[]>("/supplier");
  return data;
}
