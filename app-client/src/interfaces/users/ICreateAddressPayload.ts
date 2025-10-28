export interface ICreateAddressPayload {
  street: string;
  idStreetType: string;
  complement?: string | null;
  cep: string;
  number?: number | null;
  neighborhood: string;
  idCity: number;
}
