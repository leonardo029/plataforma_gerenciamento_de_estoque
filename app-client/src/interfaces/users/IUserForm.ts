import type { TUserRole } from "@/utils";

export interface IUserForm {
  name: string;
  email: string;
  password: string;
  isActivated: boolean;
  role: TUserRole | null;
  contact: {
    country_code: number | null;
    ddd: number | null;
    phone_number: string;
  };
  address: {
    street: string;
    idStreetType: string | null;
    complement: string | null;
    cep: string;
    number: number | null;
    neighborhood: string;
    idCity: number | null;
  };
}