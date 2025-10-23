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
          type="submit"
        >
          Entrar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
      isValid: false,
      rules: {
        required: (v) => !!v || "Campo obrigatório",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      },
    };
  },

  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        console.log("Login enviado:", {
          email: this.email,
          password: this.password,
        });
        // Aqui você pode chamar sua API de autenticação
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
