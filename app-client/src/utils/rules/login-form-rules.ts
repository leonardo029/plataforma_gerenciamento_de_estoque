
export const loginFormRules = {
  required: (v: string) => !!v || "Campo obrigatório",
  email: (v: string) => /.+@.+\..+/.test(v) || "E-mail inválido",
};