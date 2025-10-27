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

        <!-- Refresh button next to Items per page -->
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
                    @update:search="onProductSearch"
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
          <v-btn variant="text" @click="dialog = false">Cancelar</v-btn>
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
          <v-btn variant="text" @click="withdrawDialog = false">Cancelar</v-btn>
          <v-btn color="warning" :loading="withdrawing" @click="onWithdrawConfirm">Retirar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <AppSnackbar v-model="snackbar.show" :message="snackbar.message" :type="snackbar.type" />
  </div>
</template>

<script lang="ts">
import type { StockListItem, StockDetail, StockCreatePayload, StockUpdatePayload } from '@/services/stocks'
import { getStocks, getStockById, createStock, updateStock, withdrawStock, deleteStock } from '@/services/stocks'
import type { SupplierListItem } from '@/services/suppliers'
import { getSuppliers } from '@/services/suppliers'
import type { ShelfItem, CorridorItem, SectionItem } from '@/services/stock-locations'
import { getShelves, getCorridors, getSections } from '@/services/stock-locations'
import type { ProductListItem } from '@/services/products'
import { getProducts } from '@/services/products'

interface StockForm {
  id?: string
  product_id: string
  batch: string
  expiration_date: string
  cost_price: number | null
  sale_price: number | null
  supplier_id: string
  stock_quantity: number | null
  isActivated: boolean
  stock_location: {
    shelf_id: string
    corridor_id: string
    section_id: string
  }
}

export default {
  name: 'StocksPage',
  data() {
    const self = this as any
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
      stocks: [] as StockListItem[],
      loading: false,
      search: '',
      page: 1,
      itemsPerPage: 10,
      totalItems: 0,

      dialog: false,
      formValid: false,
      formRef: null as any,
      saving: false,
      form: {
        product_id: '',
        batch: '',
        expiration_date: '',
        cost_price: 0,
        sale_price: 0,
        supplier_id: '',
        stock_quantity: 0,
        isActivated: true,
        stock_location: { shelf_id: '', corridor_id: '', section_id: '' },
      } as StockForm,

      supplierItems: [] as SupplierListItem[],
      shelfItems: [] as ShelfItem[],
      corridorItems: [] as CorridorItem[],
      sectionItems: [] as SectionItem[],
      productItems: [] as ProductListItem[],

      withdrawDialog: false,
      withdrawFormRef: null as any,
      withdrawValid: false,
      withdrawing: false,
      selectedStock: null as StockListItem | null,
      withdrawQuantity: 1,

      snackbar: { show: false, message: '', type: 'success' as 'success' | 'error' | 'info' },

      rules: {
        required: (v: any) => !!v || 'Campo obrigatório',
        max45: (v: string) => !v || v.length <= 45 || 'Máx. 45 caracteres',
        min0: (v: any) => v === null || v === undefined || Number(v) >= 0 || 'Mínimo 0',
        min1: (v: any) => v === null || v === undefined || Number(v) >= 1 || 'Mínimo 1',
        decimal2: (v: any) => {
          if (v === null || v === undefined || v === '') return true
          const num = Number(v)
          if (isNaN(num)) return 'Informe um número válido'
          const [intPart, decPart] = String(num).split('.')
          return !decPart || decPart.length <= 2 || 'Máx. 2 casas decimais'
        },
      },
    }
  },
  computed: {
    filteredStocks(): StockListItem[] {
      const term = this.search?.toLowerCase() || ''
      if (!term) return this.stocks
      return this.stocks.filter((s) =>
        s.product.name.toLowerCase().includes(term) || s.batch.toLowerCase().includes(term)
      )
    },
    // Adiciona itemsLength para suportar paginação correta durante busca local
    itemsLength(): number {
      return this.search ? this.filteredStocks.length : this.totalItems
    },
    isEditing(): boolean {
      return !!this.form.id
    },
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
    async fetchStocks(): Promise<void> {
      try {
        this.loading = true
        const { items, total } = await getStocks({ page: this.page, limit: this.itemsPerPage })
        this.stocks = items
        this.totalItems = total
      } catch (err: any) {
        this.showError(err?.message || 'Erro ao carregar estoques')
      } finally {
        this.loading = false
      }
    },
    async fetchSelectData(): Promise<void> {
      try {
        const [suppliers, shelves, corridors, sections] = await Promise.all([
          getSuppliers(),
          getShelves(),
          getCorridors(),
          getSections(),
        ])
        this.supplierItems = suppliers
        this.shelfItems = shelves
        this.corridorItems = corridors
        this.sectionItems = sections
      } catch (err: any) {
        this.showError(err?.message || 'Erro ao carregar listas de localização/fornecedores')
      }
    },
    async onProductSearch(q: string): Promise<void> {
      try {
        const { items } = await getProducts({ name: q || undefined, page: 1, limit: 10 })
        this.productItems = items
      } catch {}
    },
    openCreate(): void {
      this.resetForm()
      this.dialog = true
      this.onProductSearch('')
    },
    async openEdit(id: string): Promise<void> {
      try {
        const detail: StockDetail = await getStockById(id)
        this.form = {
          id: detail.id,
          product_id: detail.product.id,
          batch: detail.batch,
          expiration_date: detail.expiration_date?.slice(0, 10) || '',
          cost_price: detail.cost_price,
          sale_price: detail.sale_price,
          supplier_id: detail.supplier.id,
          stock_quantity: detail.stock_quantity,
          isActivated: true,
          stock_location: {
            shelf_id: detail.stock_location?.shelf?.id || '',
            corridor_id: detail.stock_location?.corridor?.id || '',
            section_id: detail.stock_location?.section?.id || '',
          },
        }
        this.dialog = true
      } catch (err: any) {
        this.showError(err?.message || 'Falha ao carregar estoque')
      }
    },
    async onSubmit(): Promise<void> {
      const form = this.$refs.formRef as { validate: () => boolean } | undefined
      if (!form?.validate?.()) return
      this.saving = true
      try {
        if (this.form.id) {
          const payload: StockUpdatePayload = {
            batch: this.form.batch,
            cost_price: Number(this.form.cost_price),
            sale_price: Number(this.form.sale_price),
            supplier_id: this.form.supplier_id,
            stock_quantity: Number(this.form.stock_quantity),
            stock_location: { ...this.form.stock_location },
          }
          await updateStock(this.form.id, payload)
          this.showSuccess('Estoque atualizado com sucesso')
        } else {
          const payload: StockCreatePayload = {
            product_id: this.form.product_id,
            batch: this.form.batch,
            expiration_date: this.form.expiration_date,
            cost_price: Number(this.form.cost_price),
            sale_price: Number(this.form.sale_price),
            supplier_id: this.form.supplier_id,
            stock_quantity: Number(this.form.stock_quantity),
            isActivated: this.form.isActivated,
            stock_location: { ...this.form.stock_location },
          }
          await createStock(payload)
          this.showSuccess('Estoque criado com sucesso')
        }
        this.dialog = false
        await this.fetchStocks()
      } catch (err: any) {
        this.showError(err?.message || 'Falha ao salvar estoque')
      } finally {
        this.saving = false
      }
    },
    async onWithdrawConfirm(): Promise<void> {
      const withdrawForm = this.$refs.withdrawFormRef as { validate: () => boolean } | undefined
      if (!withdrawForm?.validate?.() || !this.selectedStock) return
      this.withdrawing = true
      try {
        await withdrawStock({ stock_id: this.selectedStock.id, stock_quantity: Number(this.withdrawQuantity) })
        this.showSuccess('Retirada realizada com sucesso')
        this.withdrawDialog = false
        await this.fetchStocks()
      } catch (err: any) {
        this.showError(err?.message || 'Falha ao retirar do estoque')
      } finally {
        this.withdrawing = false
      }
    },
    openWithdraw(item: StockListItem): void {
      this.selectedStock = item
      this.withdrawQuantity = 0
      this.withdrawDialog = true
    },
    async onDelete(id: string): Promise<void> {
      try {
        await deleteStock(id)
        this.showSuccess('Estoque removido com sucesso')
        await this.fetchStocks()
      } catch (err: any) {
        this.showError(err?.message || 'Falha ao remover estoque')
      }
    },
    resetForm(): void {
      this.form = {
        product_id: '',
        batch: '',
        expiration_date: '',
        cost_price: 0,
        sale_price: 0,
        supplier_id: '',
        stock_quantity: 0,
        isActivated: true,
        stock_location: { shelf_id: '', corridor_id: '', section_id: '' },
      } as StockForm
    },
    showSuccess(message: string): void {
      this.snackbar = { show: true, message, type: 'success' }
    },
    showError(message: string): void {
      this.snackbar = { show: true, message, type: 'error' }
    },
  },
  watch: {
    async search() {
      // busca local nos itens carregados
      // quando necessário, poderemos fazer busca server-side
    },
    async page() {
      await this.fetchStocks()
    },
    async itemsPerPage() {
      this.page = 1
      await this.fetchStocks()
    },
  },
  async mounted() {
    await Promise.all([this.fetchStocks(), this.fetchSelectData()])
    // Pré-carregar alguns produtos para o autocomplete
    await this.onProductSearch('')
  },
}
</script>