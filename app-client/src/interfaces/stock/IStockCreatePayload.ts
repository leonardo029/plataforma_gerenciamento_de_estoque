export interface IStockCreatePayload {
  product_id: string;
  batch: string;
  expiration_date: string;
  cost_price: number;
  sale_price: number;
  supplier_id: string;
  stock_quantity: number;
  isActivated: boolean;
  stock_location: { shelf_id: string; corridor_id: string; section_id: string };
}
