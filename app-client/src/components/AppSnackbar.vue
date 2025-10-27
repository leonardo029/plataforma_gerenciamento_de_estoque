<template>
  <v-snackbar
    v-model="snackbarStore.show"
    :timeout="snackbarStore.timeout"
    :color="snackbarStore.type"
    :location="snackbarStore.location"
    elevation="2"
  >
    <div class="d-flex align-center">
      <v-icon v-if="snackbarStore.showIcon" class="mr-2" :icon="iconName" />
      <span>{{ snackbarStore.message }}</span>
    </div>

    <template #actions>
      <v-btn variant="text" color="white" @click="close">Fechar</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'

export default {
  name: 'AppSnackbar',
  computed: {
    ...mapStores(useSnackbarStore),
    iconName(): string {
      return this.snackbarStore.iconName
    },
  },
  methods: {
    close(): void {
      this.snackbarStore.hide()
    },
  },
}
</script>