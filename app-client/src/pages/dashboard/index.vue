<template>
  <v-container class="pa-6">
    <v-card elevation="2">
      <v-card-title class="text-h5">Dashboard</v-card-title>
      <v-card-text>
        Bem-vindo ao Product Manager.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary" @click="logout">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth'
export default {
  name: 'DashboardPage',
  methods: {
    logout() {
      const auth = useAuthStore()
      auth.logout()
      this.$router.push('/')
    }
  }
}
</script>