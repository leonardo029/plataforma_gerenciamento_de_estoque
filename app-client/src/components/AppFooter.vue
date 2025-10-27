<template>
  <v-footer app height="40">
    <a
      v-for="item in socialLinks"
      :key="item.title"
      class="d-inline-block mx-2 social-link"
      :href="item.href"
      rel="noopener noreferrer"
      target="_blank"
      :title="item.title"
    >
      <v-icon :icon="item.icon" :size="item.icon === '$vuetify' ? 24 : 16" />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px"
    >
      &copy; {{ currentYear }}
      <span class="d-none d-sm-inline-block"> - {{ footerSuffix }}</span>
    </div>
  </v-footer>
</template>

<script lang="ts">
export default {
  name: 'AppFooter',
  data() {
    return {
      socialLinks: [
        {
          title: 'Project GitHub',
          icon: 'mdi-github',
          href: 'https://github.com/leonardo029/plataforma_gerenciamento_de_estoque/tree/main',
        },
      ],
      footerSuffix: 'Product Manager',
      currentYear: new Date().getFullYear(),
    }
  },
}
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
