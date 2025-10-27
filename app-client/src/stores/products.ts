import { defineStore } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'
import type { ProductListItem, ProductDetail, ProductCreatePayload, ProductUpdatePayload, BrandListItem, CategoryListItem } from '@/services/products'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getBrands, getCategories } from '@/services/products'

export interface ProductForm {
  id?: string;
  name: string;
  identificationCode: string;
  description: string;
  idBrand: string;
  idCategory: string;
  unitOfMeasurement: string;
  isActivated: boolean;
  nutritionalInformation: {
    portion: string;
    carbohydrate: number;
    protein: number;
    totalFat: number;
    fiber: number;
    isAllergenic: boolean;
  };
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    // List & pagination
    products: [] as ProductListItem[],
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
      name: '',
      identificationCode: '',
      description: '',
      idBrand: '',
      idCategory: '',
      unitOfMeasurement: '',
      isActivated: true,
      nutritionalInformation: {
        portion: '',
        carbohydrate: 0,
        protein: 0,
        totalFat: 0,
        fiber: 0,
        isAllergenic: false,
      },
    } as ProductForm,

    // Selects
    brandItems: [] as BrandListItem[],
    categoryItems: [] as CategoryListItem[],
  }),

  getters: {
    isEditing(state): boolean {
      return !!state.form?.id
    },
    rules() {
      return {
        required: (v: any) => (v !== null && v !== undefined && v !== '') || 'Campo obrigatório',
        max150: (v: string) => (!v || v.length <= 150) || 'Máx 150 caracteres',
        max45: (v: string) => (!v || v.length <= 45) || 'Máx 45 caracteres',
        max255: (v: string) => (!v || v.length <= 255) || 'Máx 255 caracteres',
        number: (v: any) => (v === null || v === undefined || v === '' || Number.isFinite(typeof v === 'number' ? v : Number(v))) || 'Número inválido',
      }
    },
  },

  actions: {
    async init() {
      await Promise.all([this.fetchProducts(), this.fetchBrandsAndCategories()])
    },

    async fetchProducts() {
      const sb = useSnackbarStore()
      try {
        this.loading = true
        const { items, total, page, limit } = await getProducts({ name: this.search || undefined, page: this.page, limit: this.itemsPerPage })
        this.products = items
        this.totalItems = total
        this.page = page
        this.itemsPerPage = limit
      } catch (err: any) {
        sb.error(err?.message || 'Falha ao carregar produtos')
      } finally {
        this.loading = false
      }
    },

    async fetchBrandsAndCategories() {
      const sb = useSnackbarStore()
      try {
        const [brands, categories] = await Promise.all([getBrands(), getCategories()])
        this.brandItems = brands
        this.categoryItems = categories
      } catch (err: any) {
        sb.error(err?.message || 'Erro ao carregar marcas/categorias')
      }
    },

    openCreate() {
      this.resetForm()
      this.dialog = true
    },

    async openEdit(id: string) {
      const sb = useSnackbarStore()
      try {
        const detail: ProductDetail = await getProductById(id)
        this.form = {
          id: detail.id,
          name: detail.name,
          identificationCode: detail.identification_code,
          description: detail.description || '',
          idBrand: detail.brand.id,
          idCategory: detail.category.id,
          unitOfMeasurement: detail.unit_of_measurement || '',
          isActivated: true,
          nutritionalInformation: {
            portion: detail.nutritional_information?.portion || '',
            carbohydrate: detail.nutritional_information?.carbohydrate || 0,
            protein: detail.nutritional_information?.protein || 0,
            totalFat: detail.nutritional_information?.total_fat || 0,
            fiber: detail.nutritional_information?.fiber || 0,
            isAllergenic: detail.nutritional_information?.is_allergenic || false,
          },
        }
        this.dialog = true
      } catch (err: any) {
        sb.error(err?.message || 'Falha ao carregar produto')
      }
    },

    async submit() {
      const sb = useSnackbarStore()
      this.saving = true
      try {
        if (this.form.id) {
          const payload: ProductUpdatePayload = {
            name: this.form.name,
            identificationCode: this.form.identificationCode,
            description: this.form.description,
            idBrand: this.form.idBrand,
            idCategory: this.form.idCategory,
            unitOfMeasurement: this.form.unitOfMeasurement,
            nutritionalInformation: this.form.nutritionalInformation,
          }
          await updateProduct(this.form.id, payload)
          sb.success('Produto atualizado com sucesso')
        } else {
          const payload: ProductCreatePayload = {
            name: this.form.name,
            identificationCode: this.form.identificationCode,
            description: this.form.description,
            idBrand: this.form.idBrand,
            idCategory: this.form.idCategory,
            unitOfMeasurement: this.form.unitOfMeasurement,
            isActivated: this.form.isActivated,
            nutritionalInformation: this.form.nutritionalInformation,
          }
          await createProduct(payload)
          sb.success('Produto criado com sucesso')
        }
        this.dialog = false
        await this.fetchProducts()
      } catch (err: any) {
        sb.error(err?.message || 'Falha ao salvar produto')
      } finally {
        this.saving = false
      }
    },

    async deleteProductById(id: string) {
      const sb = useSnackbarStore()
      try {
        await deleteProduct(id)
        sb.success('Produto removido com sucesso')
        await this.fetchProducts()
      } catch (err: any) {
        sb.error(err?.message || 'Falha ao remover produto')
      }
    },

    resetForm() {
      this.form = {
        name: '',
        identificationCode: '',
        description: '',
        idBrand: '',
        idCategory: '',
        unitOfMeasurement: '',
        isActivated: true,
        nutritionalInformation: {
          portion: '',
          carbohydrate: 0,
          protein: 0,
          totalFat: 0,
          fiber: 0,
          isAllergenic: false,
        },
      }
    },

    closeDialog() {
      this.dialog = false
      this.resetForm()
    },

    // Setters with side-effects
    async setSearch(v: string) {
      this.search = v
      await this.fetchProducts()
    },
    async setPage(v: number) {
      this.page = v
      await this.fetchProducts()
    },
    async setItemsPerPage(v: number) {
      this.itemsPerPage = v
      this.page = 1
      await this.fetchProducts()
    },
  },
})