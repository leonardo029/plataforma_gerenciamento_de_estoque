<template>
  <v-navigation-drawer v-model="drawer" width="280">
    <v-list density="comfortable" nav>
      <v-list-item
        to="/dashboard"
        title="Dashboard"
        prepend-icon="mdi-view-dashboard"
      />
      <v-list-item
        to="/products"
        title="Produtos"
        prepend-icon="mdi-package-variant"
      />
      <!-- Adicione mais itens de menu aqui conforme criarmos novas telas -->
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-app-bar-title>Application</v-app-bar-title>
  </v-app-bar>

  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts">
export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
