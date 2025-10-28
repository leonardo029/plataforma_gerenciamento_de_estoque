export interface IStockForm {
  id?: string;
  product_id: string;
  batch: string;
  expiration_date: string;
  cost_price: number | null;
  sale_price: number | null;
  supplier_id: string;
  stock_quantity: number | null;
  isActivated: boolean;
  stock_location: {
    shelf_id: string;
    corridor_id: string;
    section_id: string;
  };
}