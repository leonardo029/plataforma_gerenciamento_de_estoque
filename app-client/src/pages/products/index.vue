<template>
  <div class="pa-4 products-page">
    <v-toolbar density="comfortable" color="transparent" class="mb-4">
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
          <v-btn icon="mdi-pencil" variant="text" color="primary" @click="openEdit(item.id)" />
          <v-btn icon="mdi-delete" variant="text" color="error" @click="onDelete(item.id)" />
        </template>

        <template #no-data>
          <div class="pa-6 text-medium-emphasis">Nenhum produto encontrado.</div>
        </template>
        
        <template #footer.prepend>
          <v-btn
            icon="mdi-refresh"
            variant="text"
            size="small"
            :loading="loading"
            class="mr-2"
            @click="fetchProducts"
            aria-label="Atualizar"
          />
          <v-spacer />
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
                  <v-select v-model="form.unitOfMeasurement" :items="['kg', 'g', 'l', 'ml']" label="Unidade de Medida" :rules="[rules.required]" required />
                </v-col>
                <v-col cols="12" md="4" v-if="!isEditing">
                  <v-switch v-model="form.isActivated" inset label="Ativo" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="form.nutritionalInformation.portion" label="Porção" />
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

    <AppSnackbar />
  </div>
</template>

<script lang="ts">
import type { ProductListItem } from "@/services/products";
import { useProductsStore } from '@/stores/products'

type VFormRef = {
  validate: () => Promise<boolean | { valid: boolean }> | boolean | { valid: boolean };
  reset: () => void;
  resetValidation: () => void;
};

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
    };
  },
  computed: {
    productsStore() { return useProductsStore() },
    // list & pagination
    products(): ProductListItem[] { return this.productsStore.products },
    loading(): boolean { return this.productsStore.loading },
    search: {
      get(): string { return this.productsStore.search },
      set(v: string) { this.productsStore.search = v },
    },
    page: {
      get(): number { return this.productsStore.page },
      set(v: number) { this.productsStore.page = v },
    },
    itemsPerPage: {
      get(): number { return this.productsStore.itemsPerPage },
      set(v: number) { this.productsStore.itemsPerPage = v },
    },
    totalItems(): number { return this.productsStore.totalItems },

    // dialog & form
    dialog: {
      get(): boolean { return this.productsStore.dialog },
      set(v: boolean) { this.productsStore.dialog = v },
    },
    formValid: {
      get(): boolean { return this.productsStore.formValid },
      set(v: boolean) { this.productsStore.formValid = v },
    },
    saving(): boolean { return this.productsStore.saving },
    form() { return this.productsStore.form },

    // selects
    brandItems() { return this.productsStore.brandItems },
    categoryItems() { return this.productsStore.categoryItems },

    rules() { return this.productsStore.rules },

    isEditing(): boolean { return this.productsStore.isEditing },
  },
  methods: {
    async fetchProducts(): Promise<void> {
      await this.productsStore.fetchProducts()
    },
    async fetchBrandsAndCategories(): Promise<void> {
      await this.productsStore.fetchBrandsAndCategories()
    },
    openCreate(): void {
      this.productsStore.openCreate()
    },
    async openEdit(id: string): Promise<void> {
      await this.productsStore.openEdit(id)
    },
    async onSubmit(): Promise<void> {
      const form = this.$refs.formRef as unknown as VFormRef | undefined;
      const result = form ? await form.validate?.() : false;
      const isValid = typeof result === 'boolean' ? result : !!(result as any)?.valid;
      if (!isValid) return;
      await this.productsStore.submit()
    },
    async onDelete(id: string): Promise<void> {
      await this.productsStore.deleteProductById(id)
    },
    closeDialog(): void {
      this.productsStore.closeDialog()
      try {
        const form = this.$refs.formRef as unknown as VFormRef | undefined;
        form?.reset?.();
        form?.resetValidation?.();
      } catch {}
    },
  },
  watch: {
    async search() { await this.productsStore.setSearch(this.search) },
    async page() { await this.productsStore.setPage(this.page) },
    async itemsPerPage() { await this.productsStore.setItemsPerPage(this.itemsPerPage) },
  },
  async mounted() {
    await this.productsStore.init()
  },
};
</script>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
}
</style>