<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" elevation="6" max-width="400">
      <v-card-title class="text-h5 text-center mb-4"
        >Product Manager</v-card-title
      >

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

<script lang="ts">
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import AppSnackbar from "@/components/AppSnackbar.vue";

export default {
  name: "LoginForm",

  data() {
    return {
      email: "" as string,
      password: "" as string,
      showPassword: false as boolean,
      isValid: false as boolean,
    };
  },

  computed: {
    ...mapStores(useAuthStore, useSnackbarStore),
    rules(): {
      required: (v: string) => true | string;
      email: (v: string) => true | string;
    } {
      return {
        required: (v: string) => !!v || "Campo obrigatório",
        email: (v: string) => /.+@.+\..+/.test(v) || "E-mail inválido",
      };
    },
    snackbarShow(): boolean {
      return this.snackbarStore.show;
    },
    authError(): any {
      return this.authStore.error;
    },
    isLoading(): boolean {
      return this.authStore.loading;
    },
  },

  watch: {
    authError(newVal: any) {
      if (newVal) {
        const msg = Array.isArray(newVal) ? newVal.join(", ") : newVal;
        this.snackbarStore.error(msg as string);
      }
    },
    snackbarShow(val: boolean) {
      if (!val) {
        this.authStore.error = null;
      }
    },
  },

  methods: {
    async onSubmit(): Promise<void> {
      const form = this.$refs.form as any;
      if (form?.validate()) {
        await this.authStore.loginAndRedirect(this.email, this.password);
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
