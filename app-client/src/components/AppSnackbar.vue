<template>
  <v-snackbar
    v-model="internalModel"
    :timeout="timeout"
    :color="snackbarColor"
    :location="location"
    elevation="2"
  >
    <div class="d-flex align-center">
      <v-icon v-if="showIcon" class="mr-2" :icon="iconName" />
      <span>{{ message }}</span>
    </div>

    <template #actions>
      <v-btn variant="text" color="white" @click="close">Fechar</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'AppSnackbar',
  props: {
    modelValue: { type: Boolean, default: false },
    message: { type: String, default: '' },
    type: {
      type: String,
      default: 'info', // 'success' | 'error' | 'warning' | 'info'
      validator: (v) => ['success', 'error', 'warning', 'info'].includes(v),
    },
    timeout: { type: Number, default: 4000 },
    location: { type: String, default: 'bottom' }, // 'top' | 'bottom' | 'left' | 'right'
    showIcon: { type: Boolean, default: true },
  },
  emits: ['update:modelValue'],
  computed: {
    internalModel: {
      get() { return this.modelValue },
      set(val) { this.$emit('update:modelValue', val) },
    },
    snackbarColor() {
      return this.type
    },
    iconName() {
      switch (this.type) {
        case 'success': return 'mdi-check-circle'
        case 'error': return 'mdi-alert-circle'
        case 'warning': return 'mdi-alert'
        default: return 'mdi-information'
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false)
    },
  },
}
</script>