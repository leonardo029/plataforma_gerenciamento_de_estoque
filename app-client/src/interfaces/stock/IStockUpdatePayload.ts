export interface IStockUpdatePayload {
  batch?: string;
  cost_price?: number;
  sale_price?: number;
  supplier_id?: string;
  stock_quantity?: number;
  stock_location?: {
    shelf_id?: string;
    corridor_id?: string;
    section_id?: string;
  };
}
