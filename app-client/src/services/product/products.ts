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

export const getProducts = async (params?: {
  name?: string;
  page?: number;
  limit?: number;
}): Promise<IPaginated<IProductListItem>> => {
  try {
    const response = await api.get("/product", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};

export const getProductById = async (id: string): Promise<IProductDetail> => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product details.");
  }
};

export const createProduct = async (form: IProductForm): Promise<void> => {
  try {
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

    await api.post("/product", payload);
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product.");
  }
};

export const updateProduct = async (
  id: string,
  form: IProductForm
): Promise<void> => {
  try {
    const payload: IProductUpdatePayload = {
      name: form.name,
      identificationCode: form.identificationCode,
      description: form.description,
      idBrand: form.idBrand,
      idCategory: form.idCategory,
      unitOfMeasurement: form.unitOfMeasurement,
      nutritionalInformation: form.nutritionalInformation,
    };

    await api.patch(`/product/${id}`, payload);
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product.");
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete(`/product/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
};

export const getBrands = async (): Promise<IBrandListItem[]> => {
  try {
    const response = await api.get("/brand");
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to fetch brands.");
  }
};

export const getCategories = async (): Promise<ICategoryListItem[]> => {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories.");
  }
};
