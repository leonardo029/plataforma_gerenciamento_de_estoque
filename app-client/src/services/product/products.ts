import type {
  IProductListItem,
  IProductDetail,
  IProductForm,
  IProductCreatePayload,
  IProductUpdatePayload,
  IBrandListItem,
  ICategoryListItem,
  IPaginated,
} from "@/interfaces";
import api from "../api";

export async function getProducts(params?: {
  name?: string;
  page?: number;
  limit?: number;
}): Promise<IPaginated<IProductListItem>> {
  const { data } = await api.get<IPaginated<IProductListItem>>("/product", {
    params,
  });
  return data;
}

export async function getProductById(id: string): Promise<IProductDetail> {
  const { data } = await api.get<IProductDetail>(`/product/${id}`);
  return data;
}

export async function createProduct(form: IProductForm): Promise<void> {
  const payload: IProductCreatePayload = {
    name: form.name,
    identificationCode: form.identificationCode,
    description: form.description,
    idBrand: form.idBrand,
    idCategory: form.idCategory,
    unitOfMeasurement: form.unitOfMeasurement,
    isActivated: form.isActivated,
    nutritionalInformation: form.nutritionalInformation,
  };
  await api.post<void>("/product", payload);
}

export async function updateProduct(
  id: string,
  form: IProductForm
): Promise<void> {
  const payload: IProductUpdatePayload = {
    name: form.name,
    identificationCode: form.identificationCode,
    description: form.description,
    idBrand: form.idBrand,
    idCategory: form.idCategory,
    unitOfMeasurement: form.unitOfMeasurement,
    nutritionalInformation: form.nutritionalInformation,
  };
  await api.patch<void>(`/product/${id}`, payload);
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete<void>(`/product/${id}`);
}

export async function getBrands(): Promise<IBrandListItem[]> {
  const { data } = await api.get<IBrandListItem[]>("/brand");
  return data;
}

export async function getCategories(): Promise<ICategoryListItem[]> {
  const { data } = await api.get<ICategoryListItem[]>("/category");
  return data;
}
