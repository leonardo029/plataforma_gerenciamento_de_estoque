import type { TUserRole } from "@/utils";

export interface IUserListItem {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
  isActivated: boolean;
}
