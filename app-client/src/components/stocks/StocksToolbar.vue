<template>
  <v-toolbar density="comfortable" color="transparent" class="mb-4">
    <v-toolbar-title>Estoque</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      :model-value="search"
      @update:model-value="$emit('update:search', $event)"
      label="Pesquisar por produto"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      density="comfortable"
      style="max-width: 320px"
    />
    <v-btn color="primary" class="ml-4" @click="$emit('create')">
      <v-icon icon="mdi-plus" class="mr-2" />
      Novo Estoque
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
export default {
  name: "StocksToolbar",
  props: {
    search: {
      type: String,
      required: true,
    },
  },
  emits: ['update:search', 'create'],
};
</script>