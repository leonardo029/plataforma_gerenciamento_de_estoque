import { UserRoleType } from 'src/modules/user/types';

export interface UserToken {
  access_token: string;
  name: string;
  email: string;
  role: UserRoleType;
}
