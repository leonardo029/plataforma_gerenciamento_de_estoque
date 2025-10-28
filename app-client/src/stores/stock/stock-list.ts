import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import { getStocks, deleteStock } from "@/services/stock/stocks";
import type { IStockListItem } from "@/interfaces";

export const useStockListStore = defineStore("stockList", {
  state: () => ({
    stocks: [] as IStockListItem[],
    loading: false,
    search: "",
    page: 1,
    limit: 10,
    total: 0,
    searchDebounce: null as any,
  }),

  getters: {
    itemsLength(state): number {
      return state.total;
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
          limit: this.limit,
        });
        this.stocks = items;
        this.total = total;
        this.page = page;
        this.limit = limit;
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

    async setLimit(value: number) {
      this.limit = value;
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
