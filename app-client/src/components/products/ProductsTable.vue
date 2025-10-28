<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="products"
      :loading="loading"
      :items-per-page="itemsPerPage"
      :page="page"
      @update:page="$emit('update:page', $event)"
      @update:items-per-page="$emit('update:items-per-page', $event)"
      :items-length="totalItems"
      item-key="id"
      class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="text"
          color="primary"
          @click="$emit('edit', item.id)"
        />
        <v-btn
          icon="mdi-delete"
          variant="text"
          color="error"
          @click="$emit('delete', item.id)"
        />
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
          @click="$emit('refresh')"
          aria-label="Atualizar"
        />
        <v-spacer />
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import type { IProductListItem } from "@/interfaces";
import type { PropType } from "vue";

export default {
  name: "ProductsTable",
  props: {
    products: {
      type: Array as PropType<IProductListItem[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:page", "update:items-per-page", "edit", "delete", "refresh"],
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
};
</script>
