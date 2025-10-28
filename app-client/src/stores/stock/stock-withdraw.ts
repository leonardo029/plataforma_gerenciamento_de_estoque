import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import type { StockListItem } from "@/services/stocks";
import { withdrawStock } from "@/services/stocks";
import { useStockListStore } from "./stock-list";

export const useStockWithdrawStore = defineStore("stockWithdraw", {
  state: () => ({
    dialog: false,
    valid: false,
    loading: false,
    selectedStock: null as StockListItem | null,
    quantity: 1,
  }),

  getters: {
    rules() {
      return {
        required: (v: any) => !!v || "Campo obrigatório",
        min1: (v: any) =>
          v === null || v === undefined || Number(v) >= 1 || "Mínimo 1",
      };
    },
  },

  actions: {
    open(item: StockListItem) {
      this.selectedStock = item;
      this.quantity = 1;
      this.dialog = true;
    },

    async confirm() {
      const sb = useSnackbarStore();
      const stockListStore = useStockListStore();
      if (!this.selectedStock) return;

      this.loading = true;
      try {
        await withdrawStock({
          stock_id: this.selectedStock.id,
          stock_quantity: Number(this.quantity),
        });
        sb.success("Retirada realizada com sucesso");
        this.close();
        await stockListStore.fetchStocks();
      } catch (err: any) {
        sb.error(err?.message || "Falha ao retirar do estoque");
      } finally {
        this.loading = false;
      }
    },

    close() {
      this.dialog = false;
      this.selectedStock = null;
      this.quantity = 1;
      this.valid = false;
    },
  },
});
