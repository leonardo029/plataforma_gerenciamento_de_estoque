import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import { withdrawStock } from "@/services/stock/stocks";
import { useStockListStore } from "./stock-list";
import { toStockWithdrawPayload } from "@/utils";
import type { IStockListItem } from "@/interfaces";

export const useStockWithdrawStore = defineStore("stockWithdraw", {
  state: () => ({
    dialog: false,
    valid: false,
    loading: false,
    selectedStock: null as IStockListItem | null,
    quantity: 1,
  }),

  getters: {
  },

  actions: {
    open(item: IStockListItem) {
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
        const payload = toStockWithdrawPayload(
          this.selectedStock.id,
          Number(this.quantity)
        );
        await withdrawStock(payload);
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
