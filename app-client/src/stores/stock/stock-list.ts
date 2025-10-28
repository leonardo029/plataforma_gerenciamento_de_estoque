import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import type { StockListItem } from "@/services/stocks";
import { getStocks, deleteStock } from "@/services/stocks";

export const useStockListStore = defineStore("stockList", {
  state: () => ({
    stocks: [] as StockListItem[],
    loading: false,
    search: "",
    page: 1,
    itemsPerPage: 10,
    totalItems: 0,
    searchDebounce: null as any,
  }),

  getters: {
    itemsLength(state): number {
      return state.totalItems;
    },
  },

  actions: {
    async fetchStocks() {
      const sb = useSnackbarStore();
      try {
        this.loading = true;
        const { items, total, page, limit } = await getStocks({
          name: this.search || undefined,
          page: this.page,
          limit: this.itemsPerPage,
        });
        this.stocks = items;
        this.totalItems = total;
        this.page = page;
        this.itemsPerPage = limit;
      } catch (err: any) {
        sb.error(err?.message || "Falha ao carregar estoques");
      } finally {
        this.loading = false;
      }
    },

    setSearch(value: string) {
      this.search = value;
      clearTimeout(this.searchDebounce);
      this.searchDebounce = setTimeout(async () => {
        this.page = 1;
        await this.fetchStocks();
      }, 500);
    },

    async setItemsPerPage(value: number) {
      this.itemsPerPage = value;
      this.page = 1;
      await this.fetchStocks();
    },

    async setPage(value: number) {
      this.page = value;
      await this.fetchStocks();
    },

    async deleteStockById(id: string) {
      const sb = useSnackbarStore();
      try {
        await deleteStock(id);
        sb.success("Estoque removido com sucesso");
        await this.fetchStocks();
      } catch (err: any) {
        sb.error(err?.message || "Falha ao remover estoque");
      }
    },
  },
});
