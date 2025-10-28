import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import {
  getStockById,
  createStock,
  updateStock,
} from "@/services/stock/stocks";
import { getSuppliers } from "@/services/stock/suppliers";

import {
  getShelves,
  getCorridors,
  getSections,
} from "@/services/stock/stock-locations";
import { getProducts } from "@/services/product/products";
import { useStockListStore } from "./stock-list";
import { toStockCreatePayload, toStockUpdatePayload } from "@/utils";
import type {
  ISupplierListItem,
  IShelfItem,
  ICorridorItem,
  ISectionItem,
  IProductListItem,
  IStockDetail,
  IStockUpdatePayload,
  IStockCreatePayload,
  IStockForm,
} from "@/interfaces";

function defaultForm(): IStockForm {
  return {
    product_id: "",
    batch: "",
    expiration_date: "",
    cost_price: 0,
    sale_price: 0,
    supplier_id: "",
    stock_quantity: 0,
    isActivated: true,
    stock_location: { shelf_id: "", corridor_id: "", section_id: "" },
  };
}

export const useStockFormStore = defineStore("stockForm", {
  state: () => ({
    dialog: false,
    formValid: false,
    saving: false,
    form: defaultForm(),
    supplierItems: [] as ISupplierListItem[],
    shelfItems: [] as IShelfItem[],
    corridorItems: [] as ICorridorItem[],
    sectionItems: [] as ISectionItem[],
    productItems: [] as IProductListItem[],
    selectsLoaded: false,
    productsLoaded: false,
  }),

  getters: {
    isEditing(state): boolean {
      return !!state.form?.id;
    },
  },

  actions: {
    async fetchSelectData() {
      const sb = useSnackbarStore();
      try {
        const [suppliers, shelves, corridors, sections] = await Promise.all([
          getSuppliers(),
          getShelves(),
          getCorridors(),
          getSections(),
        ]);
        this.supplierItems = suppliers;
        this.shelfItems = shelves;
        this.corridorItems = corridors;
        this.sectionItems = sections;
        this.selectsLoaded = true;
      } catch (err: any) {
        sb.error(
          err?.message || "Erro ao carregar listas de localização/fornecedores"
        );
      }
    },

    async ensureSelectData() {
      if (this.selectsLoaded) return;
      await this.fetchSelectData();
    },

    async fetchAllProducts() {
      if (this.productsLoaded) return;
      const sb = useSnackbarStore();
      try {
        const all: IProductListItem[] = [];
        let page = 1;
        const limit = 100;
        while (true) {
          const { items, total } = await getProducts({ page, limit });
          all.push(...items);
          if (all.length >= total || items.length < limit) break;
          page += 1;
        }
        this.productItems = all;
        this.productsLoaded = true;
      } catch (err: any) {
        sb.error(err?.message || "Falha ao carregar produtos");
      }
    },

    async openCreate() {
      this.resetForm();
      await this.ensureSelectData();
      await this.fetchAllProducts();
      this.dialog = true;
    },

    async openEdit(id: string) {
      const sb = useSnackbarStore();
      try {
        await this.ensureSelectData();
        await this.fetchAllProducts();
        const detail: IStockDetail = await getStockById(id);
        this.form = {
          id: detail.id,
          product_id: detail.product.id,
          batch: detail.batch,
          expiration_date: detail.expiration_date?.slice(0, 10) || "",
          cost_price: detail.cost_price,
          sale_price: detail.sale_price,
          supplier_id: detail.supplier.id,
          stock_quantity: detail.stock_quantity,
          isActivated: detail.is_activated,
          stock_location: {
            shelf_id: detail.stock_location?.shelf?.id || "",
            corridor_id: detail.stock_location?.corridor?.id || "",
            section_id: detail.stock_location?.section?.id || "",
          },
        };
        this.dialog = true;
      } catch (err: any) {
        sb.error(err?.message || "Falha ao carregar estoque");
      }
    },

    async submit() {
      const sb = useSnackbarStore();
      const stockListStore = useStockListStore();
      this.saving = true;
      try {
        if (this.isEditing) {
          const payload = toStockUpdatePayload(this.form);
          await updateStock(this.form.id!, payload as IStockUpdatePayload);
          sb.success("Estoque atualizado com sucesso");
        } else {
          const payload = toStockCreatePayload(this.form);
          await createStock(payload as IStockCreatePayload);
          sb.success("Estoque criado com sucesso");
        }
        this.dialog = false;
        await stockListStore.fetchStocks();
      } catch (err: any) {
        sb.error(err?.message || "Falha ao salvar estoque");
      } finally {
        this.saving = false;
      }
    },

    resetForm() {
      this.form = defaultForm();
    },

    closeDialog() {
      this.dialog = false;
      this.resetForm();
    },
  },
});
