export interface IStockListItem {
  id: string;
  batch: string;
  expiration_date: string; // ISO date string
  cost_price: number;
  sale_price: number;
  stock_quantity: number;
  product: { name: string; identification_code: string };
}
