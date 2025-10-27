<template>
  <v-sheet class="pa-4">
    <v-avatar class="mb-4" color="grey-darken-1" size="64">
      <v-icon icon="mdi-account" size="40" />
    </v-avatar>
    <div class="text-subtitle-2">{{ userName }}</div>
    <div class="text-caption text-medium-emphasis">{{ userEmail }}</div>
  </v-sheet>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth'
import { mapStores } from 'pinia'

export default {
  name: "UserInfo",
  computed: {
    ...mapStores(useAuthStore),
    userName(): string {
      return this.authStore.user?.name ?? 'User'
    },
    userEmail(): string {
      return this.authStore.user?.email ?? ''
    },
  },
};
</script>