import { defineStore } from 'pinia'
import router from '@/router'
import { ROUTE_DASHBOARD } from '@/router/paths'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    drawer: true,
  }),
  actions: {
    toggleDrawer() { this.drawer = !this.drawer },
    openDrawer() { this.drawer = true },
    closeDrawer() { this.drawer = false },
    goDashboard() { router.push(ROUTE_DASHBOARD) },
  },
})