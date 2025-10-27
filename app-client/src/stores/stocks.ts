import { defineStore } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'
import type { StockListItem, StockDetail, StockCreatePayload, StockUpdatePayload } from '@/services/stocks'
import { getStocks, getStockById, createStock, updateStock, withdrawStock, deleteStock } from '@/services/stocks'
import type { SupplierListItem } from '@/services/suppliers'
import { getSuppliers } from '@/services/suppliers'
import type { ShelfItem, CorridorItem, SectionItem } from '@/services/stock-locations'
import { getShelves, getCorridors, getSections } from '@/services/stock-locations'
import type { ProductListItem } from '@/services/products'
import { getProducts } from '@/services/products'

export interface StockForm {
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

export const useStocksStore = defineStore('stocks', {
  state: () => ({
    // List & pagination
    stocks: [] as StockListItem[],
    loading: false,
    search: '',
    page: 1,
    itemsPerPage: 10,
    totalItems: 0,

    // Dialog & form
    dialog: false,
    formValid: false,
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

    // Selects
    supplierItems: [] as SupplierListItem[],
    shelfItems: [] as ShelfItem[],
    corridorItems: [] as CorridorItem[],
    sectionItems: [] as SectionItem[],
    productItems: [] as ProductListItem[],

    // Lazy-load flags
    selectsLoaded: false,
    productsLoaded: false,

    // Withdraw dialog
    withdrawDialog: false,
    withdrawValid: false,
    withdrawing: false,
    selectedStock: null as StockListItem | null,
    withdrawQuantity: 1,
  }),

  getters: {
    filteredStocks(state): StockListItem[] {
      // Server-side search; return items from server
      return state.stocks
    },
    itemsLength(state): number {
      // Always rely on server-provided total
      return state.totalItems
    },
    isEditing(state): boolean {
      return !!state.form?.id
    },
    rules() {
      return {
        required: (v: any) => !!v || 'Campo obrigatório',
        max45: (v: string) => !v || v.length <= 45 || 'Máx. 45 caracteres',
        min0: (v: any) => v === null || v === undefined || Number(v) >= 0 || 'Mínimo 0',
        min1: (v: any) => v === null || v === undefined || Number(v) >= 1 || 'Mínimo 1',
        decimal2: (v: any) => {
          if (v === null || v === undefined || v === '') return true
          const num = Number(v)
          if (isNaN(num)) return 'Informe um número válido'
          const [, decPart] = String(num).split('.')
          return !decPart || decPart.length <= 2 || 'Máx. 2 casas decimais'
        },
      }
    },
  },

  actions: {
    async init() {
      await this.fetchStocks()
    },

    async fetchStocks() {
      const sb = useSnackbarStore()
      try {
        this.loading = true
        const { items, total } = await getStocks({ name: this.search || undefined, page: this.page, limit: this.itemsPerPage })
        this.stocks = items
        this.totalItems = total
      } catch (err: any) {
        sb.error(err?.message || 'Erro ao carregar estoques')
      } finally {
        this.loading = false
      }
    },

    async fetchSelectData() {
      const sb = useSnackbarStore()
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
        this.selectsLoaded = true
      } catch (err: any) {
        sb.error(err?.message || 'Erro ao carregar listas de localização/fornecedores')
      }
    },

    async ensureSelectData() {
      if (this.selectsLoaded && this.supplierItems.length && this.shelfItems.length && this.corridorItems.length && this.sectionItems.length) {
        return
      }
      await this.fetchSelectData()
    },

    async fetchAllProducts() {
      try {
        const all: ProductListItem[] = []
        let page = 1
        const limit = 100
        // Aggregate all pages until we reach total or last page is smaller than limit
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { items, total } = await getProducts({ page, limit })
          all.push(...items)
          if (all.length >= total || items.length < limit) break
          page += 1
        }
        this.productItems = all
        this.productsLoaded = true
      } catch {}
    },

    async openCreate() {
      this.resetForm()
      await this.ensureSelectData()
      if (!this.productsLoaded) {
        await this.fetchAllProducts()
      }
      this.dialog = true
    },

    async openEdit(id: string) {
      const sb = useSnackbarStore()
      try {
        await this.ensureSelectData()
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
        sb.error(err?.message || 'Falha ao carregar estoque')
      }
    },

    async submit() {
      const sb = useSnackbarStore()
      this.saving = true
      try {
        if (this.form.id) {
          const payload: StockUpdatePayload = {
            batch: this.form.batch,
            cost_price: Number(this.form.cost_price ?? 0),
            sale_price: Number(this.form.sale_price ?? 0),
            supplier_id: this.form.supplier_id,
            stock_quantity: Number(this.form.stock_quantity ?? 0),
            stock_location: { ...this.form.stock_location },
          }
          await updateStock(this.form.id, payload)
          sb.success('Estoque atualizado com sucesso')
        } else {
          const payload: StockCreatePayload = {
            product_id: this.form.product_id,
            batch: this.form.batch,
            expiration_date: this.form.expiration_date,
            cost_price: Number(this.form.cost_price ?? 0),
            sale_price: Number(this.form.sale_price ?? 0),
            supplier_id: this.form.supplier_id,
            stock_quantity: Number(this.form.stock_quantity ?? 0),
            isActivated: this.form.isActivated,
            stock_location: { ...this.form.stock_location },
          }
          await createStock(payload)
          sb.success('Estoque criado com sucesso')
        }
        this.dialog = false
        await this.fetchStocks()
      } catch (err: any) {
        sb.error(err?.message || 'Falha ao salvar estoque')
      } finally {
        this.saving = false
      }
    },

    async deleteStockById(id: string) {
      const sb = useSnackbarStore()
      try {
        await deleteStock(id)
        sb.success('Estoque removido com sucesso')
        await this.fetchStocks()
      } catch (err: any) {
        sb.error(err?.message || 'Falha ao remover estoque')
      }
    },

    openWithdraw(item: StockListItem) {
      this.selectedStock = item
      this.withdrawQuantity = 0
      this.withdrawDialog = true
    },

    async withdrawConfirm() {
      const sb = useSnackbarStore()
      if (!this.selectedStock) return
      this.withdrawing = true
      try {
        await withdrawStock({ stock_id: this.selectedStock.id, stock_quantity: Number(this.withdrawQuantity) })
        sb.success('Retirada realizada com sucesso')
        this.withdrawDialog = false
        await this.fetchStocks()
      } catch (err: any) {
        sb.error(err?.message || 'Falha ao retirar do estoque')
      } finally {
        this.withdrawing = false
      }
    },

    closeDialog() {
      this.dialog = false
    },

    closeWithdrawDialog() {
      this.withdrawDialog = false
      this.selectedStock = null
      this.withdrawQuantity = 1
      this.withdrawValid = false
    },

    resetForm() {
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

    async setSearch(v: string) {
      this.search = v
      this.page = 1
      await this.fetchStocks()
    },
    async setPage(v: number) {
      this.page = v
      await this.fetchStocks()
    },
    async setItemsPerPage(v: number) {
      this.itemsPerPage = v
      this.page = 1
      await this.fetchStocks()
    },
  },
})