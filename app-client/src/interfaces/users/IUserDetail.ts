import type { TUserRole } from "@/utils";

export interface IUserDetail {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
  isActivated: boolean;
  contact?: {
    countryCode: number;
    ddd: number;
    phoneNumber: string;
  };
  address?: {
    street: string;
    idStreetType?: string;
    streetType?: string;
    complement?: string | null;
    cep: string;
    number?: number | null;
    neighborhood: string;
    idCity?: number;
    city?: {
      name: string;
      state: {
        name: string;
        acronym: string;
        region: string;
      };
    };
  };
}
