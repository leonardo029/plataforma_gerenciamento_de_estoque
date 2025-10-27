<template>
  <div class="pa-4 stocks-page">
    <StocksToolbar
      :search="search"
      @update:search="search = $event"
      @create="openCreate"
    />

    <StocksTable
      :stocks="filteredStocks"
      :loading="loading"
      :page="page"
      @update:page="page = $event"
      :items-per-page="itemsPerPage"
      @update:items-per-page="itemsPerPage = $event"
      :items-length="itemsLength"
      @edit="openEdit"
      @withdraw="openWithdraw"
      @delete="onDelete"
      @refresh="fetchStocks"
    />

    <StockEditDialog
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :form-valid="formValid"
      @update:form-valid="formValid = $event"
      :saving="saving"
      :form="form"
      @update:form="form = $event"
      :is-editing="isEditing"
      :product-items="productItems"
      :supplier-items="supplierItems"
      :shelf-items="shelfItems"
      :corridor-items="corridorItems"
      :section-items="sectionItems"
      :rules="rules"
      @close="closeDialog"
      @submit="onSubmit"
    />

    <StockWithdrawDialog
      :dialog="withdrawDialog"
      @update:dialog="withdrawDialog = $event"
      :form-valid="withdrawValid"
      @update:form-valid="withdrawValid = $event"
      :loading="withdrawing"
      :quantity="withdrawQuantity"
      @update:quantity="withdrawQuantity = $event"
      :rules="rules"
      @close="closeWithdrawDialog"
      @submit="onWithdrawConfirm"
    />

    <AppSnackbar />
  </div>
</template>

<script lang="ts">
import type { StockListItem } from '@/services/stocks'
import { useStocksStore } from '@/stores/stocks'

export default {
  name: 'StocksPage',
  computed: {
    stocksStore() { return useStocksStore() },

    // list & pagination
    filteredStocks(): StockListItem[] { return this.stocksStore.filteredStocks },
    itemsLength(): number { return this.stocksStore.itemsLength },
    loading(): boolean { return this.stocksStore.loading },
    search: {
      get(): string { return this.stocksStore.search },
      set(v: string) { this.stocksStore.search = v },
    },
    page: {
      get(): number { return this.stocksStore.page },
      set(v: number) { this.stocksStore.page = v },
    },
    itemsPerPage: {
      get(): number { return this.stocksStore.itemsPerPage },
      set(v: number) { this.stocksStore.itemsPerPage = v },
    },
    totalItems(): number { return this.stocksStore.totalItems },

    // dialog & form
    dialog: {
      get(): boolean { return this.stocksStore.dialog },
      set(v: boolean) { this.stocksStore.dialog = v },
    },
    formValid: {
      get(): boolean { return this.stocksStore.formValid },
      set(v: boolean) { this.stocksStore.formValid = v },
    },
    saving(): boolean { return this.stocksStore.saving },
    form: {
      get() { return this.stocksStore.form },
      set(v: any) { this.stocksStore.form = v },
    },

    // selects
    supplierItems() { return this.stocksStore.supplierItems },
    shelfItems() { return this.stocksStore.shelfItems },
    corridorItems() { return this.stocksStore.corridorItems },
    sectionItems() { return this.stocksStore.sectionItems },
    productItems() { return this.stocksStore.productItems },

    // withdraw dialog
    withdrawDialog: {
      get(): boolean { return this.stocksStore.withdrawDialog },
      set(v: boolean) { this.stocksStore.withdrawDialog = v },
    },
    withdrawValid: {
      get(): boolean { return this.stocksStore.withdrawValid },
      set(v: boolean) { this.stocksStore.withdrawValid = v },
    },
    withdrawing(): boolean { return this.stocksStore.withdrawing },
    withdrawQuantity: {
      get(): number { return this.stocksStore.withdrawQuantity },
      set(v: number) { this.stocksStore.withdrawQuantity = v },
    },

    rules() { return this.stocksStore.rules },
    isEditing(): boolean { return this.stocksStore.isEditing },
  },
  methods: {
    async fetchStocks() { await this.stocksStore.fetchStocks() },
    async fetchSelectData() { await this.stocksStore.fetchSelectData() },
    openCreate() { this.stocksStore.openCreate() },
    async openEdit(id: string) { await this.stocksStore.openEdit(id) },

    async onSubmit(): Promise<void> {
      await this.stocksStore.submit()
    },

    openWithdraw(item: StockListItem) { this.stocksStore.openWithdraw(item) },
    async onWithdrawConfirm(): Promise<void> {
      await this.stocksStore.withdrawConfirm()
    },

    async onDelete(id: string) { await this.stocksStore.deleteStockById(id) },

    closeDialog(): void {
      this.stocksStore.closeDialog()
    },
    closeWithdrawDialog(): void {
      this.stocksStore.closeWithdrawDialog()
    },
  },
  watch: {
    async search() { await this.stocksStore.setSearch(this.search) },
    async page() { await this.stocksStore.setPage(this.page) },
    async itemsPerPage() { await this.stocksStore.setItemsPerPage(this.itemsPerPage) },
  },
  async mounted() {
    await this.stocksStore.init()
  },
}
</script>

<style scoped>
.stocks-page {
  display: flex;
  flex-direction: column;
}
</style>