import type { INutritionalInformationPayload } from "./INutritionalInformationPayload";

export interface IProductCreatePayload {
  name: string;
  identificationCode: string;
  description: string;
  idBrand: string;
  idCategory: string;
  nutritionalInformation: INutritionalInformationPayload;
  unitOfMeasurement: string;
  isActivated: boolean;
}
