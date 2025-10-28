<template>
  <v-navigation-drawer app v-model="drawer" width="280">
    <UserInfo />

    <v-divider class="my-2" />

    <v-list density="comfortable" nav>
      <v-list-item
        to="/dashboard"
        title="Dashboard"
        prepend-icon="mdi-view-dashboard"
      />
      <v-list-item to="/stocks" title="Estoque" prepend-icon="mdi-warehouse" />
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
      <v-list-item title="Sair" prepend-icon="mdi-logout" @click="logout" />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth/auth";
import { useLayoutStore } from "@/stores/layout/layout";
import { mapStores } from "pinia";
export default {
  name: "MenuVertical",
  computed: {
    ...mapStores(useAuthStore, useLayoutStore),
    drawer: {
      get() {
        return this.layoutStore.drawer;
      },
      set(v: boolean) {
        this.layoutStore.drawer = v;
      },
    },
    isAdmin(): boolean {
      return String(this.authStore.user?.role ?? "").toLowerCase() === "admin";
    },
  },
  methods: {
    logout(): void {
      this.authStore.logoutAndRedirect();
    },
  },
};
</script>
