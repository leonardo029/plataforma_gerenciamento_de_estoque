<template>
  <v-dialog :model-value="dialog" @update:model-value="$emit('update:dialog', $event)" max-width="900">
    <v-card>
      <v-card-title>
        <span class="text-h6">{{ isEditing ? 'Editar Estoque' : 'Novo Estoque' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef" :model-value="formValid" @update:model-value="$emit('update:formValid', $event)">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :model-value="form.product_id"
                  @update:model-value="$emit('update:form', { ...form, product_id: $event })"
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
                <v-text-field :model-value="form.batch" @update:model-value="$emit('update:form', { ...form, batch: $event })" label="Lote" :rules="[rules.required, rules.max45]" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :model-value="form.expiration_date" @update:model-value="$emit('update:form', { ...form, expiration_date: $event })" label="Validade" type="date" :disabled="isEditing" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :model-value.number="form.stock_quantity" @update:model-value="$emit('update:form', { ...form, stock_quantity: $event })" label="Quantidade" type="number" :rules="[rules.min0]" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :model-value.number="form.cost_price" @update:model-value="$emit('update:form', { ...form, cost_price: $event })" label="Preço de Custo" type="number" :rules="[rules.decimal2, rules.min0]" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :model-value.number="form.sale_price" @update:model-value="$emit('update:form', { ...form, sale_price: $event })" label="Preço de Venda" type="number" :rules="[rules.decimal2, rules.min0]" />
              </v-col>
              <v-col cols="12" md="6">
                <v-select :model-value="form.supplier_id" @update:model-value="$emit('update:form', { ...form, supplier_id: $event })" :items="supplierItems" item-title="name" item-value="id" label="Fornecedor" :rules="[rules.required]" />
              </v-col>
              <v-col cols="12" md="6" class="d-flex align-center">
                <v-switch :model-value="form.isActivated" @update:model-value="$emit('update:form', { ...form, isActivated: $event })" inset label="Ativo" />
              </v-col>
              <v-col cols="12" md="4">
                <v-select :model-value="form.stock_location.shelf_id" @update:model-value="$emit('update:form', { ...form, stock_location: { ...form.stock_location, shelf_id: $event } })" :items="shelfItems" item-title="name" item-value="id" label="Prateleira" />
              </v-col>
              <v-col cols="12" md="4">
                <v-select :model-value="form.stock_location.corridor_id" @update:model-value="$emit('update:form', { ...form, stock_location: { ...form.stock_location, corridor_id: $event } })" :items="corridorItems" item-title="name" item-value="id" label="Corredor" />
              </v-col>
              <v-col cols="12" md="4">
                <v-select :model-value="form.stock_location.section_id" @update:model-value="$emit('update:form', { ...form, stock_location: { ...form.stock_location, section_id: $event } })" :items="sectionItems" item-title="name" item-value="id" label="Seção" />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="primary" :loading="saving" @click="submit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { ProductListItem } from '@/services/products'
import type { SupplierListItem } from '@/services/suppliers'
import type { ShelfItem, CorridorItem, SectionItem } from '@/services/stock-locations'
import type { StockForm } from '@/stores/stock/stock-form';

type VFormRef = {
  validate: () => Promise<boolean | { valid: boolean }>;
  reset: () => void;
  resetValidation: () => void;
};

export default {
  name: 'StockEditDialog',
  props: {
    dialog: { type: Boolean, required: true },
    formValid: { type: Boolean, required: true },
    saving: { type: Boolean, required: true },
    form: { type: Object as PropType<StockForm>, required: true },
    isEditing: { type: Boolean, required: true },
    productItems: { type: Array as PropType<ProductListItem[]>, required: true },
    supplierItems: { type: Array as PropType<SupplierListItem[]>, required: true },
    shelfItems: { type: Array as PropType<ShelfItem[]>, required: true },
    corridorItems: { type: Array as PropType<CorridorItem[]>, required: true },
    sectionItems: { type: Array as PropType<SectionItem[]>, required: true },
    rules: { type: Object, required: true },
  },
  emits: ['update:dialog', 'update:formValid', 'update:form', 'close', 'submit'],
  methods: {
    async submit() {
      const form = this.$refs.formRef as unknown as VFormRef | undefined;
      const result = form ? await form.validate?.() : false;
      const isValid = typeof result === 'boolean' ? result : !!(result as any)?.valid;
      if (!isValid) return;
      this.$emit('submit');
    },
    reset() {
      const form = this.$refs.formRef as unknown as VFormRef | undefined;
      form?.reset?.();
      form?.resetValidation?.();
    }
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.reset();
      }
    }
  }
}
</script>