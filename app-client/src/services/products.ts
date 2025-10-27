import api from "./api";

export interface ProductForm {
  id?: string;
  name: string;
  identificationCode: string;
  description: string;
  idBrand: string;
  idCategory: string;
  unitOfMeasurement: string;
  isActivated: boolean;
  nutritionalInformation: {
    portion: string;
    carbohydrate: number;
    protein: number;
    totalFat: number;
    fiber: number;
    isAllergenic: boolean;
  };
}

export type NutritionalInformationPayload = {
  portion: string;
  carbohydrate: number;
  protein: number;
  totalFat: number;
  fiber: number;
  isAllergenic: boolean;
};

export type ProductCreatePayload = {
  name: string;
  identificationCode: string;
  description: string;
  idBrand: string;
  idCategory: string;
  nutritionalInformation: NutritionalInformationPayload;
  unitOfMeasurement: string;
  isActivated: boolean;
};

export type ProductUpdatePayload = Partial<{
  name: string;
  identificationCode: string;
  description: string;
  idBrand: string;
  idCategory: string;
  nutritionalInformation: NutritionalInformationPayload;
  unitOfMeasurement: string;
  isActivated: boolean;
}>;

export type ProductListItem = {
  id: string;
  name: string;
  identification_code: string;
  brand: string;
  category: string;
};

export type ProductDetail = {
  id: string;
  name: string;
  identification_code: string;
  description: string;
  brand: { id: string; name: string };
  category: { id: string; name: string };
  nutritional_information: {
    id?: string;
    portion: string;
    carbohydrate: number;
    protein: number;
    total_fat: number;
    fiber: number;
    is_allergenic: boolean;
  };
  unit_of_measurement: string;
};

export type Paginated<T> = { items: T[]; total: number; page: number; limit: number };

export type BrandListItem = { id: string; name: string };
export type CategoryListItem = { id: string; name: string };

export async function getProducts(params?: { name?: string; page?: number; limit?: number }): Promise<Paginated<ProductListItem>> {
  const { data } = await api.get<Paginated<ProductListItem>>("/product", { params });
  return data;
}

export async function getProductById(id: string): Promise<ProductDetail> {
  const { data } = await api.get<ProductDetail>(`/product/${id}`);
  return data;
}

export async function createProduct(form: ProductForm): Promise<void> {
  const payload: ProductCreatePayload = {
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

export async function updateProduct(id: string, form: ProductForm): Promise<void> {
  const payload: ProductUpdatePayload = {
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

export async function getBrands(): Promise<BrandListItem[]> {
  const { data } = await api.get<BrandListItem[]>("/brand");
  return data;
}

export async function getCategories(): Promise<CategoryListItem[]> {
  const { data } = await api.get<CategoryListItem[]>("/category");
  return data;
}