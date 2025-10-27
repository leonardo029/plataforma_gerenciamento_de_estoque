<template>
  <MenuVertical />
  <AppBar />

  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts">
export default {
  name: "DefaultLayout",
};
</script>
