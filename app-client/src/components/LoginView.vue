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
          type="password"
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

        <AppSnackbar
          v-model="snackbarVisible"
          :message="snackbarMessage"
          :type="snackbarType"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import AppSnackbar from '@/components/AppSnackbar.vue'
export default {
  name: "LoginView",
  components: { AppSnackbar },

  data() {
    return {
      email: "",
      password: "",
      isValid: false,
      snackbarVisible: false,
      snackbarMessage: "",
      snackbarType: "info",
      rules: {
        required: (v) => !!v || "Campo obrigatório",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      },
    };
  },

  computed: {
    authStore() { return useAuthStore() },
    authError() { return this.authStore.error },
    isLoading() { return this.authStore.loading },
  },

  watch: {
    authError(newVal) {
      if (newVal) {
        const msg = Array.isArray(newVal) ? newVal.join(', ') : newVal
        this.snackbarMessage = msg
        this.snackbarType = 'error'
        this.snackbarVisible = true
      }
    },
    snackbarVisible(val) {
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
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  width: 100%;
  max-width: 400px;
}
</style>
