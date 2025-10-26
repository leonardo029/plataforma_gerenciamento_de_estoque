<template>
  <div class="products-page">
    <v-toolbar density="comfortable" color="transparent">
      <v-toolbar-title>Produtos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Pesquisar por nome"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        density="comfortable"
        style="max-width: 320px"
      />
      <v-btn color="primary" class="ml-4" @click="openCreate">
        <v-icon icon="mdi-plus" class="mr-2" />
        Novo Produto
      </v-btn>
    </v-toolbar>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="products"
        :loading="loading"
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items-length="totalItems"
        item-key="id"
        class="elevation-1"
      >
        <template #item.actions="{ item }">
          <v-btn icon="mdi-pencil" variant="text" @click="openEdit(item.id)" />
          <v-btn icon="mdi-delete" variant="text" color="error" @click="onDelete(item.id)" />
        </template>
        <template #loading>
          <v-skeleton-loader type="table" />
        </template>
        <template #no-data>
          <div class="pa-6 text-medium-emphasis">Nenhum produto encontrado.</div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ isEditing ? 'Editar Produto' : 'Novo Produto' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" v-model="formValid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.name" label="Nome" :rules="[rules.required, rules.max150]" required />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.identificationCode" label="Código de Identificação" :rules="[rules.required, rules.max45]" required />
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="form.description" label="Descrição" :rules="isEditing ? [rules.max255] : [rules.required, rules.max255]" rows="3" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.idBrand"
                    :items="brandItems"
                    item-title="name"
                    item-value="id"
                    label="Marca"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.idCategory"
                    :items="categoryItems"
                    item-title="name"
                    item-value="id"
                    label="Categoria"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="form.unitOfMeasurement" label="Unidade de Medida" :rules="[rules.required, rules.max45]" required />
                </v-col>
                <v-col cols="12" md="8" class="d-flex align-center">
                  <v-switch v-model="form.isActivated" inset label="Ativo" />
                </v-col>
              </v-row>

              <v-divider class="my-4" />

              <v-row>
                <v-col cols="12">
                  <span class="text-subtitle-1">Informações Nutricionais</span>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="form.nutritionalInformation.portion" label="Porção" :rules="[rules.required]" required />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model.number="form.nutritionalInformation.carbohydrate" type="number" label="Carboidratos (g)" :rules="[rules.number]" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model.number="form.nutritionalInformation.protein" type="number" label="Proteínas (g)" :rules="[rules.number]" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model.number="form.nutritionalInformation.totalFat" type="number" label="Gorduras Totais (g)" :rules="[rules.number]" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model.number="form.nutritionalInformation.fiber" type="number" label="Fibras (g)" :rules="[rules.number]" />
                </v-col>
                <v-col cols="12" md="4" class="d-flex align-center">
                  <v-switch v-model="form.nutritionalInformation.isAllergenic" inset label="Possui Alérgenos" />
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

    <AppSnackbar v-model="snackbar.show" :message="snackbar.message" :type="snackbar.type" />
  </div>
</template>

<script lang="ts">
import type { ProductListItem, ProductDetail, ProductCreatePayload, ProductUpdatePayload, BrandListItem, CategoryListItem } from "@/services/products";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getBrands, getCategories } from "@/services/products";

interface ProductForm {
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

export default {
  name: "ProductsPage",
  data() {
    return {
      headers: [
        { title: "Nome", key: "name" },
        { title: "Código", key: "identification_code" },
        { title: "Marca", key: "brand" },
        { title: "Categoria", key: "category" },
        { title: "Ações", key: "actions", sortable: false, align: "end" },
      ] as const,
      products: [] as ProductListItem[],
      loading: false,
      search: "",
      page: 1,
      itemsPerPage: 10,
      totalItems: 0,

      dialog: false,
      formValid: false,
      formRef: null as any,
      saving: false,
      form: {
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
      } as ProductForm,

      brandItems: [] as BrandListItem[],
      categoryItems: [] as CategoryListItem[],

      snackbar: {
        show: false,
        message: "",
        type: "success" as "success" | "error" | "info",
      },

      rules: {
        required: (v: string | number | boolean) => !!v || "Campo obrigatório",
        max150: (v: string) => !v || v.length <= 150 || "Máx. 150 caracteres",
        max45: (v: string) => !v || v.length <= 45 || "Máx. 45 caracteres",
        max255: (v: string) => !v || v.length <= 255 || "Máx. 255 caracteres",
        number: (v: any) => v === null || v === undefined || !isNaN(Number(v)) || "Informe um número válido",
      },
    };
  },
  computed: {
    isEditing(): boolean {
      return !!(this.form as ProductForm).id;
    },
  },
  methods: {
    async fetchProducts(): Promise<void> {
      this.loading = true;
      try {
        const { items, total } = await getProducts({
          name: this.search || undefined,
          page: this.page,
          limit: this.itemsPerPage,
        });
        this.products = items;
        this.totalItems = total;
      } catch (err: any) {
        this.showError(err?.message || "Erro ao carregar produtos");
      } finally {
        this.loading = false;
      }
    },
    async fetchBrandsAndCategories(): Promise<void> {
      try {
        const [brands, categories] = await Promise.all([getBrands(), getCategories()]);
        this.brandItems = brands;
        this.categoryItems = categories;
      } catch (err: any) {
        this.showError(err?.message || "Erro ao carregar marcas/categorias");
      }
    },
    openCreate(): void {
      this.resetForm();
      this.dialog = true;
    },
    async openEdit(id: string): Promise<void> {
      try {
        const detail: ProductDetail = await getProductById(id);
        this.form = {
          id: detail.id,
          name: detail.name,
          identificationCode: detail.identification_code,
          description: detail.description,
          idBrand: detail.brand.id,
          idCategory: detail.category.id,
          unitOfMeasurement: detail.unit_of_measurement,
          isActivated: true,
          nutritionalInformation: {
            portion: detail.nutritional_information.portion,
            carbohydrate: detail.nutritional_information.carbohydrate,
            protein: detail.nutritional_information.protein,
            totalFat: detail.nutritional_information.total_fat,
            fiber: detail.nutritional_information.fiber,
            isAllergenic: detail.nutritional_information.is_allergenic,
          },
        } as ProductForm;
        this.dialog = true;
      } catch (err: any) {
        this.showError(err?.message || "Erro ao carregar produto");
      }
    },
    closeDialog(): void {
      this.dialog = false;
    },
    async onSubmit(): Promise<void> {
      if (!this.formRef) return;
      const result = await this.formRef.validate();
      const isValid = (typeof result === 'object' && result !== null) ? (result.valid ?? result) : result;
      if (!isValid) return;
      this.saving = true;
      try {
        if (this.isEditing && this.form.id) {
          const payload: ProductUpdatePayload = {
            name: this.form.name,
            identificationCode: this.form.identificationCode,
            // enviar descrição apenas se preenchida para não zerar o backend
            ...(this.form.description ? { description: this.form.description } : {}),
            idBrand: this.form.idBrand,
            idCategory: this.form.idCategory,
            unitOfMeasurement: this.form.unitOfMeasurement,
            isActivated: this.form.isActivated,
            nutritionalInformation: { ...this.form.nutritionalInformation },
          };
          await updateProduct(this.form.id, payload);
          this.showSuccess("Produto atualizado com sucesso");
        } else {
          const payload: ProductCreatePayload = {
            name: this.form.name,
            identificationCode: this.form.identificationCode,
            description: this.form.description,
            idBrand: this.form.idBrand,
            idCategory: this.form.idCategory,
            unitOfMeasurement: this.form.unitOfMeasurement,
            isActivated: this.form.isActivated,
            nutritionalInformation: { ...this.form.nutritionalInformation },
          };
          await createProduct(payload);
          this.showSuccess("Produto criado com sucesso");
        }
        this.dialog = false;
        await this.fetchProducts();
      } catch (err: any) {
        this.showError(err?.message || "Falha ao salvar produto");
      } finally {
        this.saving = false;
      }
    },
    async onDelete(id: string): Promise<void> {
      try {
        await deleteProduct(id);
        this.showSuccess("Produto removido com sucesso");
        await this.fetchProducts();
      } catch (err: any) {
        this.showError(err?.message || "Falha ao remover produto");
      }
    },
    resetForm(): void {
      this.form = {
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
      } as ProductForm;
    },
    showSuccess(message: string): void {
      this.snackbar = { show: true, message, type: "success" };
    },
    showError(message: string): void {
      this.snackbar = { show: true, message, type: "error" };
    },
  },
  watch: {
    async search() {
      await this.fetchProducts();
    },
    async page() {
      await this.fetchProducts();
    },
    async itemsPerPage() {
      this.page = 1;
      await this.fetchProducts();
    },
  },
  async mounted() {
    await Promise.all([this.fetchProducts(), this.fetchBrandsAndCategories()]);
  },
};
</script>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>