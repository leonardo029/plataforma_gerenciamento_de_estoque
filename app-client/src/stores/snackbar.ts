import { defineStore } from 'pinia'

export type SnackbarType = 'success' | 'error' | 'warning' | 'info'
export type SnackbarLocation = 'top' | 'bottom' | 'left' | 'right'

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    show: false,
    message: '',
    type: 'info' as SnackbarType,
    timeout: 4000,
    location: 'bottom' as SnackbarLocation,
    showIcon: true,
  }),
  getters: {
    iconName(state): string {
      switch (state.type) {
        case 'success': return 'mdi-check-circle'
        case 'error': return 'mdi-alert-circle'
        case 'warning': return 'mdi-alert'
        default: return 'mdi-information'
      }
    },
    color(state): string {
      return state.type
    },
  },
  actions: {
    open(payload: { message: string; type?: SnackbarType; timeout?: number; location?: SnackbarLocation; showIcon?: boolean }) {
      this.message = payload.message
      this.type = payload.type ?? 'info'
      if (payload.timeout !== undefined) this.timeout = payload.timeout
      if (payload.location !== undefined) this.location = payload.location
      if (payload.showIcon !== undefined) this.showIcon = payload.showIcon
      this.show = true
    },
    success(message: string) { this.open({ message, type: 'success' }) },
    error(message: string) { this.open({ message, type: 'error' }) },
    warning(message: string) { this.open({ message, type: 'warning' }) },
    info(message: string) { this.open({ message, type: 'info' }) },
    hide() { this.show = false },
  },
})