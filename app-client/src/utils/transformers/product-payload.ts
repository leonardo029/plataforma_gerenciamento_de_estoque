import type { IProductCreatePayload, IProductForm, IProductUpdatePayload } from "@/interfaces";

export const toProductCreatePayload = (form: IProductForm): IProductCreatePayload => ({
  name: form.name,
  identificationCode: form.identificationCode,
  description: form.description,
  idBrand: form.idBrand,
  idCategory: form.idCategory,
  unitOfMeasurement: form.unitOfMeasurement,
  isActivated: form.isActivated,
  nutritionalInformation: form.nutritionalInformation,
});

export const toProductUpdatePayload = (form: IProductForm): IProductUpdatePayload => ({
  name: form.name,
  identificationCode: form.identificationCode,
  description: form.description,
  idBrand: form.idBrand,
  idCategory: form.idCategory,
  unitOfMeasurement: form.unitOfMeasurement,
  nutritionalInformation: form.nutritionalInformation,
});