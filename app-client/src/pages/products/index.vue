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
      :rules="productRules"
      :is-editing="isEditing"
      @close="closeDialog"
      @submit="onSubmit"
    />

    <AppSnackbar />
  </div>
</template>

<script lang="ts">
import { useProductListStore } from "@/stores/product/product-list";
import { mapStores } from "pinia";
import { productRules } from "@/utils/rules/product-rules";
import { useProductFormStore } from "@/stores/product/product-form";
import type { IProductListItem } from "@/interfaces";

export default {
  name: "ProductsPage",
  data() {
    return {
      productRules,
    };
  },
  computed: {
    ...mapStores(useProductListStore, useProductFormStore),
    // list & pagination
    products(): IProductListItem[] {
      return this.productListStore.products;
    },
    loading(): boolean {
      return this.productListStore.loading;
    },
    search: {
      get(): string {
        return this.productListStore.search;
      },
      set(v: string) {
        this.productListStore.setSearch(v);
      },
    },
    page: {
      get(): number {
        return this.productListStore.page;
      },
      set(v: number) {
        this.productListStore.setPage(v);
      },
    },
    itemsPerPage: {
      get(): number {
        return this.productListStore.itemsPerPage;
      },
      set(v: number) {
        this.productListStore.setItemsPerPage(v);
      },
    },
    totalItems(): number {
      return this.productListStore.totalItems;
    },

    // dialog & form
    dialog: {
      get(): boolean {
        return this.productFormStore.dialog;
      },
      set(v: boolean) {
        this.productFormStore.dialog = v;
      },
    },
    formValid: {
      get(): boolean {
        return this.productFormStore.formValid;
      },
      set(v: boolean) {
        this.productFormStore.formValid = v;
      },
    },
    saving(): boolean {
      return this.productFormStore.saving;
    },
    form: {
      get() {
        return this.productFormStore.form;
      },
      set(v: any) {
        this.productFormStore.form = v;
      },
    },

    // selects
    brandItems() {
      return this.productFormStore.brandItems;
    },
    categoryItems() {
      return this.productFormStore.categoryItems;
    },

    isEditing(): boolean {
      return this.productFormStore.isEditing;
    },
  },
  methods: {
    async fetchProducts(): Promise<void> {
      await this.productListStore.fetchProducts();
    },
    openCreate(): void {
      this.productFormStore.openCreate();
    },
    async openEdit(id: string): Promise<void> {
      await this.productFormStore.openEdit(id);
    },
    async onSubmit(): Promise<void> {
      await this.productFormStore.submit();
    },
    async onDelete(id: string): Promise<void> {
      await this.productListStore.deleteProductById(id);
    },
    closeDialog(): void {
      this.productFormStore.closeDialog();
    },
  },
  async mounted() {
    await this.productListStore.fetchProducts();
  },
};
</script>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
}
</style>
