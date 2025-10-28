import { defineStore } from 'pinia'
import router from '@/router'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    drawer: true,
  }),
  actions: {
    toggleDrawer() { this.drawer = !this.drawer },
    openDrawer() { this.drawer = true },
    closeDrawer() { this.drawer = false },
    goDashboard() { router.push('/dashboard') },
  },
})