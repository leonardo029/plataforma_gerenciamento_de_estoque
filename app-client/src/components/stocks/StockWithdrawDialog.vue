<template>
  <v-dialog :model-value="dialog" @update:model-value="$emit('update:dialog', $event)" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h6">Retirar do Estoque</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef" :model-value="formValid" @update:model-value="$emit('update:formValid', $event)">
          <v-text-field
            :model-value="quantity"
            @update:model-value="$emit('update:quantity', $event)"
            type="number"
            label="Quantidade a retirar"
            :rules="[rules.min1]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="warning" :loading="loading" @click="submit">Retirar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue'

type VFormRef = {
  validate: () => Promise<boolean | { valid: boolean }>;
  reset: () => void;
  resetValidation: () => void;
};

export default {
  name: 'StockWithdrawDialog',
  props: {
    dialog: { type: Boolean, required: true },
    formValid: { type: Boolean, required: true },
    loading: { type: Boolean, required: true },
    quantity: { type: Number, required: true },
    rules: { type: Object, required: true },
  },
  emits: ['update:dialog', 'update:formValid', 'update:quantity', 'close', 'submit'],
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