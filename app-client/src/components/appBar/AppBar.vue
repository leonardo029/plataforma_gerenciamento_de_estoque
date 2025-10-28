<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title style="cursor: pointer" @click="goDashboard"
      >Product Manager</v-app-bar-title
    >
  </v-app-bar>
</template>

<script lang="ts">
import { useLayoutStore } from "@/stores/layout/layout";
import { mapStores } from "pinia";
export default {
  name: "AppBar",
  computed: {
    ...mapStores(useLayoutStore),
  },
  methods: {
    toggleDrawer(): void {
      this.layoutStore.toggleDrawer();
    },
    goDashboard(): void {
      this.layoutStore.goDashboard();
    },
  },
};
</script>
