import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import type {
  StockDetail,
  StockCreatePayload,
  StockUpdatePayload,
} from "@/services/stocks";
import { getStockById, createStock, updateStock } from "@/services/stocks";
import type { SupplierListItem } from "@/services/suppliers";
import { getSuppliers } from "@/services/suppliers";
import type {
  ShelfItem,
  CorridorItem,
  SectionItem,
} from "@/services/stock-locations";
import {
  getShelves,
  getCorridors,
  getSections,
} from "@/services/stock-locations";
import type { ProductListItem } from "@/services/products";
import { getProducts } from "@/services/products";
import { useStockListStore } from "./stock-list";

export interface StockForm {
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

function defaultForm(): StockForm {
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
    supplierItems: [] as SupplierListItem[],
    shelfItems: [] as ShelfItem[],
    corridorItems: [] as CorridorItem[],
    sectionItems: [] as SectionItem[],
    productItems: [] as ProductListItem[],
    selectsLoaded: false,
    productsLoaded: false,
  }),

  getters: {
    isEditing(state): boolean {
      return !!state.form?.id;
    },
    rules() {
      return {
        required: (v: any) => !!v || "Campo obrigatório",
        max45: (v: string) => !v || v.length <= 45 || "Máx. 45 caracteres",
        min0: (v: any) =>
          v === null || v === undefined || Number(v) >= 0 || "Mínimo 0",
        min1: (v: any) =>
          v === null || v === undefined || Number(v) >= 1 || "Mínimo 1",
        decimal2: (v: any) => {
          if (v === null || v === undefined || v === "") return true;
          const num = Number(v);
          if (isNaN(num)) return "Informe um número válido";
          const [, decPart] = String(num).split(".");
          return !decPart || decPart.length <= 2 || "Máx. 2 casas decimais";
        },
      };
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
        const all: ProductListItem[] = [];
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
        const detail: StockDetail = await getStockById(id);
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
        const payload = {
          ...this.form,
          cost_price: Number(this.form.cost_price ?? 0),
          sale_price: Number(this.form.sale_price ?? 0),
          stock_quantity: Number(this.form.stock_quantity ?? 0),
        };

        if (this.isEditing) {
          await updateStock(this.form.id!, payload as StockUpdatePayload);
          sb.success("Estoque atualizado com sucesso");
        } else {
          await createStock(payload as StockCreatePayload);
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
