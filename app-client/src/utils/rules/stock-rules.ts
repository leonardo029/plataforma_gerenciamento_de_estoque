export const stockRules = {
  required: (v: any) => !!v || "Campo obrigatório",
  max45: (v: string) => !v || v.length <= 45 || "Máx. 45 caracteres",
  min0: (v: any) => v === null || v === undefined || Number(v) >= 0 || "Mínimo 0",
  min1: (v: any) => v === null || v === undefined || Number(v) >= 1 || "Mínimo 1",
  decimal2: (v: any) => {
    if (v === null || v === undefined || v === "") return true;
    const num = Number(v);
    if (isNaN(num)) return "Informe um número válido";
    const [, decPart] = String(num).split(".");
    return !decPart || decPart.length <= 2 || "Máx. 2 casas decimais";
  },
};