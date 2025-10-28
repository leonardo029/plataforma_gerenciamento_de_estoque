import type { TUserRole } from "@/utils";
import type { ICreateAddressPayload } from "./ICreateAddressPayload";
import type { ICreateContactPayload } from "./ICreateContactPayload";

export interface IUserCreatePayload  {
  name: string;
  email: string;
  password: string;
  isActivated: boolean;
  role: TUserRole;
  contact: ICreateContactPayload;
  address: ICreateAddressPayload;
};