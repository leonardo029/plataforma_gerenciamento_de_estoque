import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import { getProducts, deleteProduct } from "@/services/product/products";
import type { IProductListItem } from "@/interfaces";

export const useProductListStore = defineStore("productList", {
  state: () => ({
    products: [] as IProductListItem[],
    loading: false,
    search: "",
    page: 1,
    limit: 10,
    total: 0,
    searchDebounce: null as any, // State to hold the debounce timer
  }),

  actions: {
    async fetchProducts() {
      const sb = useSnackbarStore();
      try {
        this.loading = true;
        const { items, total, page, limit } = await getProducts({
          name: this.search || undefined,
          page: this.page,
          limit: this.limit,
        });
        this.products = items;
        this.total = total;
        this.page = page;
        this.limit = limit;
      } catch (err: any) {
        sb.error(err?.message || "Falha ao carregar produtos");
      } finally {
        this.loading = false;
      }
    },

    // Smart action with debouncing and page reset
    setSearch(value: string) {
      this.search = value;
      clearTimeout(this.searchDebounce);
      this.searchDebounce = setTimeout(async () => {
        this.page = 1;
        await this.fetchProducts();
      }, 500);
    },

    // Smart action with page reset
    async setLimit(value: number) {
      this.limit = value;
      this.page = 1;
      await this.fetchProducts();
    },

    async setPage(value: number) {
      this.page = value;
      await this.fetchProducts();
    },

    async deleteProductById(id: string) {
      const sb = useSnackbarStore();
      try {
        await deleteProduct(id);
        sb.success("Produto removido com sucesso");
        await this.fetchProducts();
      } catch (err: any) {
        sb.error(err?.message || "Falha ao remover produto");
      }
    },
  },
});
