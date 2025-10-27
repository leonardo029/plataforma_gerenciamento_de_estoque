<template>
  <v-snackbar
    v-model="snackbar.show"
    :timeout="snackbar.timeout"
    :color="snackbar.type"
    :location="snackbar.location"
    elevation="2"
  >
    <div class="d-flex align-center">
      <v-icon v-if="snackbar.showIcon" class="mr-2" :icon="iconName" />
      <span>{{ snackbar.message }}</span>
    </div>

    <template #actions>
      <v-btn variant="text" color="white" @click="close">Fechar</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore()
const iconName = computed(() => snackbar.iconName)

function close() { snackbar.hide() }
</script>