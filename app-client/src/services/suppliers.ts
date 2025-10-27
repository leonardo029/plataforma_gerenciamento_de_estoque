import api from './api'

export type SupplierListItem = {
  id: string;
  name: string;
  email: string;
};

export async function getSuppliers(): Promise<SupplierListItem[]> {
  const { data } = await api.get<SupplierListItem[]>('/supplier');
  return data;
}