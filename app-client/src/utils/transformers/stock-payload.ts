import type {
  IStockCreatePayload,
  IStockUpdatePayload,
  IStockWithdrawPayload,
  IStockForm,
} from "@/interfaces";

export const toStockCreatePayload = (form: IStockForm): IStockCreatePayload => ({
  product_id: form.product_id,
  batch: form.batch,
  expiration_date: form.expiration_date,
  cost_price: Number(form.cost_price ?? 0),
  sale_price: Number(form.sale_price ?? 0),
  supplier_id: form.supplier_id,
  stock_quantity: Number(form.stock_quantity ?? 0),
  isActivated: form.isActivated,
  stock_location: {
    shelf_id: form.stock_location.shelf_id,
    corridor_id: form.stock_location.corridor_id,
    section_id: form.stock_location.section_id,
  },
});

export const toStockUpdatePayload = (form: IStockForm): IStockUpdatePayload => ({
  batch: form.batch,
  cost_price: Number(form.cost_price ?? 0),
  sale_price: Number(form.sale_price ?? 0),
  supplier_id: form.supplier_id,
  stock_quantity: Number(form.stock_quantity ?? 0),
  stock_location: {
    shelf_id: form.stock_location.shelf_id,
    corridor_id: form.stock_location.corridor_id,
    section_id: form.stock_location.section_id,
  },
});

export const toStockWithdrawPayload = (
  stock_id: string,
  stock_quantity: number
): IStockWithdrawPayload => ({ stock_id, stock_quantity: Number(stock_quantity) });