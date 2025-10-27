<template>
  <v-navigation-drawer app v-model="drawer" width="280">
    <v-sheet class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64">
        <v-icon icon="mdi-account" size="40" />
      </v-avatar>
      <div class="text-subtitle-2">{{ userName }}</div>
      <div class="text-caption text-medium-emphasis">{{ userEmail }}</div>
    </v-sheet>

    <v-divider class="my-2" />

    <v-list density="comfortable" nav>
      <v-list-item
        to="/dashboard"
        title="Dashboard"
        prepend-icon="mdi-view-dashboard"
      />
      <v-list-item
        to="/stocks"
        title="Estoque"
        prepend-icon="mdi-warehouse"
      />
      <v-list-item
        to="/products"
        title="Produtos"
        prepend-icon="mdi-package-variant"
      />
      <v-list-item
        v-if="isAdmin"
        to="/users"
        title="Usuários"
        prepend-icon="mdi-account"
      />
      <v-divider class="my-2" />
      <v-list-item
        title="Sair"
        prepend-icon="mdi-logout"
        @click="logout"
      />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title style="cursor: pointer" @click="goDashboard">Product Manager</v-app-bar-title>
  </v-app-bar>

  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useLayoutStore } from '@/stores/layout'
export default {
  name: "DefaultLayout",
  computed: {
    authStore() { return useAuthStore() },
    layoutStore() { return useLayoutStore() },
    drawer: {
      get() { return this.layoutStore.drawer },
      set(v:any) { this.layoutStore.drawer = v },
    },
    userName(): string {
      return this.authStore.user?.name ?? 'Usuário'
    },
    userEmail(): string {
      return this.authStore.user?.email ?? ''
    },
    isAdmin(): boolean {
      return String(this.authStore.user?.role ?? '').toLowerCase() === 'admin'
    }
  },
  methods: {
    toggleDrawer() {
      this.layoutStore.toggleDrawer()
    },
    goDashboard() {
      this.layoutStore.goDashboard()
    },
    logout() {
      this.authStore.logoutAndRedirect()
    }
  }
};
</script>
