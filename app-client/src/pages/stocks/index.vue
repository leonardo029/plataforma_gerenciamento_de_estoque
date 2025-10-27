<template>
  <div class="pa-4 stocks-page">
    <v-toolbar density="comfortable" color="transparent" class="mb-4">
      <v-toolbar-title>Estoque</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Pesquisar por produto/lote"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        density="comfortable"
        style="max-width: 320px"
      />
      <v-btn color="primary" class="ml-4" @click="openCreate">
        <v-icon icon="mdi-plus" class="mr-2" />
        Novo Estoque
      </v-btn>
    </v-toolbar>

    <v-card>
      <v-data-table-server
        :headers="headers"
        :items="filteredStocks"
        :loading="loading"
        v-model:page="page"
        v-model:items-per-page="itemsPerPage"
        :items-length="itemsLength"
        item-key="id"
        class="elevation-1"
      >
        <template #item.product="{ item }">
          <div>
            <div class="text-body-2">{{ item.product.name }}</div>
            <div class="text-caption text-medium-emphasis">Código: {{ item.product.identification_code }}</div>
          </div>
        </template>
        <template #item.cost_price="{ item }">R$ {{ formatCurrency(item.cost_price) }}</template>
        <template #item.sale_price="{ item }">R$ {{ formatCurrency(item.sale_price) }}</template>
        <template #item.expiration_date="{ item }">
          <v-chip :color="getExpirationColor(item.expiration_date)" size="small">
            {{ formatDate(item.expiration_date) }}
          </v-chip>
        </template>
        <template #item.stock_quantity="{ item }">
          <v-chip :color="getQuantityColor(item.stock_quantity)" size="small">
            {{ item.stock_quantity }}
          </v-chip>
        </template>
        <template #item.actions="{ item }">
          <v-btn icon="mdi-pencil" variant="text" color="primary" @click="openEdit(item.id)" />
          <v-btn icon="mdi-minus" variant="text" color="warning" @click="openWithdraw(item)" />
          <v-btn icon="mdi-delete" variant="text" color="error" @click="onDelete(item.id)" />
        </template>

        <template #no-data>
          <div class="pa-6 text-medium-emphasis">Nenhum estoque encontrado.</div>
        </template>

        <template #footer.prepend>
          <v-btn
            icon="mdi-refresh"
            variant="text"
            size="small"
            :loading="loading"
            class="mr-2"
            @click="fetchStocks"
            aria-label="Atualizar"
          />
          <v-spacer />
        </template>
      </v-data-table-server>
    </v-card>

    <!-- Create/Edit dialog -->
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ isEditing ? 'Editar Estoque' : 'Novo Estoque' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" v-model="formValid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="form.product_id"
                    :items="productItems"
                    item-title="name"
                    item-value="id"
                    label="Produto"
                    :disabled="isEditing"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.batch" label="Lote" :rules="[rules.required, rules.max45]" required />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.expiration_date" label="Validade" type="date" :disabled="isEditing" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model.number="form.stock_quantity" label="Quantidade" type="number" :rules="[rules.min0]" required />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model.number="form.cost_price" label="Preço de Custo" type="number" :rules="[rules.decimal2, rules.min0]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model.number="form.sale_price" label="Preço de Venda" type="number" :rules="[rules.decimal2, rules.min0]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select v-model="form.supplier_id" :items="supplierItems" item-title="name" item-value="id" label="Fornecedor" :rules="[rules.required]" />
                </v-col>
                <v-col cols="12" md="6" class="d-flex align-center">
                  <v-switch v-model="form.isActivated" inset label="Ativo" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-select v-model="form.stock_location.shelf_id" :items="shelfItems" item-title="name" item-value="id" label="Prateleira" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-select v-model="form.stock_location.corridor_id" :items="corridorItems" item-title="name" item-value="id" label="Corredor" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-select v-model="form.stock_location.section_id" :items="sectionItems" item-title="name" item-value="id" label="Seção" />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" :loading="saving" @click="onSubmit">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Withdraw dialog -->
    <v-dialog v-model="withdrawDialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h6">Retirar do Estoque</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="withdrawFormRef" v-model="withdrawValid">
            <v-text-field v-model.number="withdrawQuantity" type="number" label="Quantidade a retirar" :rules="[rules.min1]" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeWithdrawDialog">Cancelar</v-btn>
          <v-btn color="warning" :loading="withdrawing" @click="onWithdrawConfirm">Retirar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <AppSnackbar />
  </div>
</template>

<script lang="ts">
import type { StockListItem } from '@/services/stocks'
import { useStocksStore } from '@/stores/stocks'

type VFormRef = {
  validate: () => Promise<boolean | { valid: boolean }> | boolean | { valid: boolean };
  reset: () => void;
  resetValidation: () => void;
};

export default {
  name: 'StocksPage',
  data() {
    return {
      headers: [
        { title: 'Produto', key: 'product' },
        { title: 'Lote', key: 'batch' },
        { title: 'Validade', key: 'expiration_date' },
        { title: 'Preço Custo', key: 'cost_price' },
        { title: 'Preço Venda', key: 'sale_price' },
        { title: 'Quantidade', key: 'stock_quantity' },
        { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
      ] as const,
    }
  },
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
    form() { return this.stocksStore.form },

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
    formatCurrency(value: any): string {
      const num = Number(value || 0)
      return num.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    },
    formatDate(date: string): string {
      if (!date) return '-'
      return String(date).slice(0, 10)
    },
    getExpirationColor(date: string): string {
      if (!date) return ''
      const today = new Date()
      const exp = new Date(date)
      const msDiff = exp.getTime() - today.getTime()
      const daysDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24))
      if (daysDiff < 0) return 'error'
      if (daysDiff <= 30) return 'warning'
      return 'success'
    },
    getQuantityColor(qty: number): string {
      const n = Number(qty || 0)
      if (n === 0) return 'error'
      if (n <= 50) return 'warning'
      return ''
    },

    async fetchStocks() { await this.stocksStore.fetchStocks() },
    async fetchSelectData() { await this.stocksStore.fetchSelectData() },
    openCreate() { this.stocksStore.openCreate() },
    async openEdit(id: string) { await this.stocksStore.openEdit(id) },

    async onSubmit(): Promise<void> {
      const form = this.$refs.formRef as unknown as VFormRef | undefined
      const result = form ? await form.validate?.() : false
      const isValid = typeof result === 'boolean' ? result : !!(result as any)?.valid
      if (!isValid) return
      await this.stocksStore.submit()
    },

    openWithdraw(item: StockListItem) { this.stocksStore.openWithdraw(item) },
    async onWithdrawConfirm(): Promise<void> {
      const form = this.$refs.withdrawFormRef as unknown as VFormRef | undefined
      const result = form ? await form.validate?.() : false
      const isValid = typeof result === 'boolean' ? result : !!(result as any)?.valid
      if (!isValid) return
      await this.stocksStore.withdrawConfirm()
    },

    async onDelete(id: string) { await this.stocksStore.deleteStockById(id) },

    closeDialog(): void {
      this.stocksStore.closeDialog()
      try {
        const form = this.$refs.formRef as unknown as VFormRef | undefined
        form?.reset?.()
        form?.resetValidation?.()
      } catch {}
    },
    closeWithdrawDialog(): void {
      this.stocksStore.closeWithdrawDialog()
      try {
        const form = this.$refs.withdrawFormRef as unknown as VFormRef | undefined
        form?.reset?.()
        form?.resetValidation?.()
      } catch {}
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