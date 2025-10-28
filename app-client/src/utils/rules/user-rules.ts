export const userRules = {
  required: (v: any) => (v !== null && v !== undefined && v !== '') || 'Campo obrigatório',
  email: (v: string) => (!v || /.+@.+\..+/.test(v)) || 'E-mail inválido',
  passwordMin8: (v: string) => (!v || v.length >= 8) || 'Mínimo 8 caracteres',
  minPassword: (v: string) => (!v || v.length >= 8) || 'Mínimo 8 caracteres',
  max150: (v: string) => (!v || v.length <= 150) || 'Máx 150 caracteres',
  max45: (v: string) => (!v || v.length <= 45) || 'Máx 45 caracteres',
  max255: (v: string) => (!v || v.length <= 255) || 'Máx 255 caracteres',
  number: (v: any) => (v === null || v === undefined || v === '' || Number.isFinite(typeof v === 'number' ? v : Number(v))) || 'Número inválido',
  positiveInt: (v: any) => {
    if (v === null || v === undefined || v === '') return true;
    const n = Number(v);
    return Number.isInteger(n) && n > 0 || 'Número inválido';
  },
  cep: (v: string) => {
    if (!v) return true;
    const digits = String(v).replace(/\D/g, '');
    return /^\d{8}$/.test(digits) || 'CEP inválido';
  },
  phone: (v: string) => {
    if (!v) return true;
    const digits = String(v).replace(/\D/g, '');
    return /^\d{8,11}$/.test(digits) || 'Telefone inválido';
  },
  ddd: (v: any) => {
    if (v === null || v === undefined || v === '') return true;
    const n = Number(v);
    return Number.isInteger(n) && n >= 10 && n <= 99 || 'DDD inválido';
  },
  countryCode: (v: any) => {
    if (v === null || v === undefined || v === '') return true;
    const n = Number(v);
    return Number.isInteger(n) && n >= 1 && n <= 999 || 'Código de país inválido';
  },
};