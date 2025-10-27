export const rules = {
  required: (v: any) => (v !== null && v !== undefined && v !== '') || 'Campo obrigatório',
  max150: (v: string) => (!v || v.length <= 150) || 'Máx 150 caracteres',
  max45: (v: string) => (!v || v.length <= 45) || 'Máx 45 caracteres',
  max255: (v: string) => (!v || v.length <= 255) || 'Máx 255 caracteres',
  number: (v: any) => (v === null || v === undefined || v === '' || Number.isFinite(typeof v === 'number' ? v : Number(v))) || 'Número inválido',
}
