import { defineStore } from 'pinia'

export type SocialLink = { title: string; icon: string; href: string }

export const useAppMetaStore = defineStore('appMeta', {
  state: () => ({
    socialLinks: [
      {
        title: 'Project GitHub',
        icon: 'mdi-github',
        href: 'https://github.com/leonardo029/plataforma_gerenciamento_de_estoque/tree/main',
      },
    ] as SocialLink[],
    footerSuffix: 'Product Manager' as string,
  }),
  getters: {
    currentYear: () => new Date().getFullYear(),
  },
  actions: {
    setSocialLinks(links: SocialLink[]) {
      this.socialLinks = links
    },
    setFooterSuffix(suffix: string) {
      this.footerSuffix = suffix
    },
  },
})