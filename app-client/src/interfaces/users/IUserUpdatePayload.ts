import type { ICreateAddressPayload } from "./ICreateAddressPayload";
import type { ICreateContactPayload } from "./ICreateContactPayload";

export interface IUserUpdatePayload {
  name?: string;
  email?: string;
  password?: string;
  isActivated?: boolean;
  contact?: Partial<ICreateContactPayload>;
  address?: Partial<ICreateAddressPayload>;
}
