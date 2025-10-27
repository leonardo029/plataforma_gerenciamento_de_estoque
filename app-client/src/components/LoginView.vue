<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" elevation="6" max-width="400">
      <v-card-title class="text-h5 text-center mb-4">Product Manager</v-card-title>

      <v-form ref="form" v-model="isValid" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          density="comfortable"
          label="Email"
          outlined
          prepend-inner-icon="mdi-email"
          :rules="[rules.required, rules.email]"
          type="email"
        />

        <v-text-field
          v-model="password"
          density="comfortable"
          label="Senha"
          outlined
          prepend-inner-icon="mdi-lock"
          :rules="[rules.required]"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        />

        <v-btn
          block
          class="mt-4"
          color="primary"
          :disabled="!isValid"
          :loading="isLoading"
          type="submit"
        >
          Entrar
        </v-btn>

        <AppSnackbar />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import AppSnackbar from '@/components/AppSnackbar.vue'
import { useSnackbarStore } from '@/stores/snackbar'

export default {
  name: "LoginView",
  components: { AppSnackbar },

  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      isValid: false,
    }
  },

  computed: {
    authStore() { return useAuthStore() },
    snackbarStore() { return useSnackbarStore() },
    rules() {
      return {
        required: (v) => !!v || 'Campo obrigatório',
        email: (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
      }
    },
    snackbarShow() { return this.snackbarStore.show },
    authError() { return this.authStore.error },
    isLoading() { return this.authStore.loading },
  },

  watch: {
    authError(newVal) {
      if (newVal) {
        const msg = Array.isArray(newVal) ? newVal.join(', ') : newVal
        this.snackbarStore.error(msg)
      }
    },
    snackbarShow(val) {
      if (!val) {
        this.authStore.error = null
      }
    }
  },

  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        const ok = await this.authStore.login(this.email, this.password)
        if (ok) {
          this.$router.push('/dashboard')
        }
        await this.authStore.loginAndRedirect(this.email, this.password)
      }
    },
  },
}
</script>

<style scoped>
.v-card {
  width: 100%;
  max-width: 400px;
}
</style>
