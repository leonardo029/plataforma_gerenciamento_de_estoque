export interface IProductDetail {
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
}
