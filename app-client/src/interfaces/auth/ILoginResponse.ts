export interface ILoginResponse {
  access_token: string;
  name: string;
  email: string;
  role: "admin" | "user";
};