<template>
  <v-card>
    <v-data-table-server
      :headers="headers"
      :items="stocks"
      :loading="loading"
      :page="page"
      @update:page="$emit('update:page', $event)"
      :items-per-page="itemsPerPage"
      @update:items-per-page="$emit('update:items-per-page', $event)"
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
        <v-btn icon="mdi-pencil" variant="text" color="primary" @click="$emit('edit', item.id)" />
        <v-btn icon="mdi-minus" variant="text" color="warning" @click="$emit('withdraw', item)" />
        <v-btn icon="mdi-delete" variant="text" color="error" @click="$emit('delete', item.id)" />
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
          @click="$emit('refresh')"
          aria-label="Atualizar"
        />
        <v-spacer />
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script lang="ts">
import type { StockListItem } from "@/services/stocks";
import type { PropType } from "vue";

export default {
  name: "StocksTable",
  props: {
    stocks: {
      type: Array as PropType<StockListItem[]>,
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
    itemsLength: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:page', 'update:items-per-page', 'edit', 'withdraw', 'delete', 'refresh'],
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
    };
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
  },
};
</script>