export interface IProductForm {
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