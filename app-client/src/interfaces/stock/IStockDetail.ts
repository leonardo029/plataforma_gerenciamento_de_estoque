export interface IStockDetail {
  id: string;
  batch: string;
  expiration_date: string; // ISO date string
  cost_price: number;
  sale_price: number;
  stock_quantity: number;
  is_activated: boolean;
  product: {
    id: string;
    name: string;
    identification_code: string;
    description: string;
    brand: { id: string; name: string };
    category: { id: string; name: string };
    unit_of_measurement: string;
  };
  supplier: { id: string; name: string; email: string };
  stock_location: {
    shelf: { id: string; name: string };
    corridor: { id: string; name: string };
    section: { id: string; name: string };
  };
}
