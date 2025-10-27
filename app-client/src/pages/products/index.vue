<template>
  <div class="pa-4 products-page">
    <ProductsToolbar
      :search="search"
      @update:search="search = $event"
      @create="openCreate"
    />

    <ProductsTable
      :products="products"
      :loading="loading"
      :page="page"
      @update:page="page = $event"
      :items-per-page="itemsPerPage"
      @update:items-per-page="itemsPerPage = $event"
      :total-items="totalItems"
      @edit="openEdit"
      @delete="onDelete"
      @refresh="fetchProducts"
    />

    <ProductEditDialog
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :form-valid="formValid"
      @update:form-valid="formValid = $event"
      :saving="saving"
      :form="form"
      @update:form="form = $event"
      :brand-items="brandItems"
      :category-items="categoryItems"
      :rules="rules"
      :is-editing="isEditing"
      @close="closeDialog"
      @submit="onSubmit"
    />

    <AppSnackbar />
  </div>
</template>

<script lang="ts">
import type { ProductListItem } from "@/services/products";
import { useProductsStore } from "@/stores/products";
import { mapStores } from "pinia";

export default {
  name: "ProductsPage",
  computed: {
    ...mapStores(useProductsStore),
    // list & pagination
    products(): ProductListItem[] {
      return this.productsStore.products;
    },
    loading(): boolean {
      return this.productsStore.loading;
    },
    search: {
      get(): string {
        return this.productsStore.search;
      },
      set(v: string) {
        this.productsStore.search = v;
      },
    },
    page: {
      get(): number {
        return this.productsStore.page;
      },
      set(v: number) {
        this.productsStore.page = v;
      },
    },
    itemsPerPage: {
      get(): number {
        return this.productsStore.itemsPerPage;
      },
      set(v: number) {
        this.productsStore.itemsPerPage = v;
      },
    },
    totalItems(): number {
      return this.productsStore.totalItems;
    },

    // dialog & form
    dialog: {
      get(): boolean {
        return this.productsStore.dialog;
      },
      set(v: boolean) {
        this.productsStore.dialog = v;
      },
    },
    formValid: {
      get(): boolean {
        return this.productsStore.formValid;
      },
      set(v: boolean) {
        this.productsStore.formValid = v;
      },
    },
    saving(): boolean {
      return this.productsStore.saving;
    },
    form: {
      get() {
        return this.productsStore.form;
      },
      set(v: any) {
        this.productsStore.form = v;
      },
    },

    // selects
    brandItems() {
      return this.productsStore.brandItems;
    },
    categoryItems() {
      return this.productsStore.categoryItems;
    },

    rules() {
      return this.productsStore.rules;
    },

    isEditing(): boolean {
      return this.productsStore.isEditing;
    },
  },
  methods: {
    async fetchProducts(): Promise<void> {
      await this.productsStore.fetchProducts();
    },
    async fetchBrandsAndCategories(): Promise<void> {
      await this.productsStore.fetchBrandsAndCategories();
    },
    openCreate(): void {
      this.productsStore.openCreate();
    },
    async openEdit(id: string): Promise<void> {
      await this.productsStore.openEdit(id);
    },
    async onSubmit(): Promise<void> {
      await this.productsStore.submit();
    },
    async onDelete(id: string): Promise<void> {
      await this.productsStore.deleteProductById(id);
    },
    closeDialog(): void {
      this.productsStore.closeDialog();
    },
  },
  watch: {
    async search(newVal: string) {
      await this.productsStore.setSearch(newVal);
    },
    async page(newVal: number) {
      await this.productsStore.setPage(newVal);
    },
    async itemsPerPage(newVal: number) {
      await this.productsStore.setItemsPerPage(newVal);
    },
  },
  async mounted() {
    await this.productsStore.init();
  },
};
</script>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
}
</style>
