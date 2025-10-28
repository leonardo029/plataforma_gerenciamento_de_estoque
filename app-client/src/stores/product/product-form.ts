import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import {
  getProductById,
  createProduct,
  updateProduct,
  getBrands,
  getCategories,
} from "@/services/product/products";
import { useProductListStore } from "./product-list";
import type { IProductForm, IBrandListItem, ICategoryListItem, IProductDetail } from "@/interfaces";

function defaultForm(): IProductForm {
  return {
    name: "",
    identificationCode: "",
    description: "",
    idBrand: "",
    idCategory: "",
    unitOfMeasurement: "",
    isActivated: true,
    nutritionalInformation: {
      portion: "",
      carbohydrate: 0,
      protein: 0,
      totalFat: 0,
      fiber: 0,
      isAllergenic: false,
    },
  };
}

export const useProductFormStore = defineStore("productForm", {
  state: () => ({
    dialog: false,
    formValid: false,
    saving: false,
    form: defaultForm(),
    brandItems: [] as IBrandListItem[],
    categoryItems: [] as ICategoryListItem[],
    selectsLoaded: false,
  }),

  getters: {
    isEditing(state): boolean {
      return !!state.form?.id;
    },
  },

  actions: {
    async fetchBrandsAndCategories() {
      if (this.selectsLoaded) return;
      const sb = useSnackbarStore();
      try {
        const [brands, categories] = await Promise.all([
          getBrands(),
          getCategories(),
        ]);
        this.brandItems = brands;
        this.categoryItems = categories;
        this.selectsLoaded = true;
      } catch (err: any) {
        sb.error(err?.message || "Erro ao carregar marcas/categorias");
      }
    },

    async ensureBrandCategory() {
      if (this.selectsLoaded) return;
      await this.fetchBrandsAndCategories();
    },

    async openCreate() {
      await this.ensureBrandCategory();
      this.resetForm();
      this.dialog = true;
    },

    async openEdit(id: string) {
      const sb = useSnackbarStore();
      try {
        await this.ensureBrandCategory();
        const detail: IProductDetail = await getProductById(id);
        this.form = {
          id: detail.id,
          name: detail.name,
          identificationCode: detail.identification_code,
          description: detail.description || "",
          idBrand: detail.brand.id,
          idCategory: detail.category.id,
          unitOfMeasurement: detail.unit_of_measurement || "",
          isActivated: true,
          nutritionalInformation: {
            portion: detail.nutritional_information?.portion || "",
            carbohydrate: detail.nutritional_information?.carbohydrate || 0,
            protein: detail.nutritional_information?.protein || 0,
            totalFat: detail.nutritional_information?.total_fat || 0,
            fiber: detail.nutritional_information?.fiber || 0,
            isAllergenic:
              detail.nutritional_information?.is_allergenic || false,
          },
        };
        this.dialog = true;
      } catch (err: any) {
        sb.error(err?.message || "Falha ao carregar produto");
      }
    },

    async submit() {
      const sb = useSnackbarStore();
      const productListStore = useProductListStore();
      this.saving = true;
      try {
        if (this.isEditing) {
          await updateProduct(this.form.id!, this.form);
          sb.success("Produto atualizado com sucesso");
        } else {
          await createProduct(this.form);
          sb.success("Produto criado com sucesso");
        }
        this.dialog = false;
        await productListStore.fetchProducts();
      } catch (err: any) {
        sb.error(err?.message || "Falha ao salvar produto");
      } finally {
        this.saving = false;
      }
    },

    resetForm() {
      this.form = defaultForm();
    },

    closeDialog() {
      this.dialog = false;
      this.resetForm();
    },
  },
});
