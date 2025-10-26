import api from "./api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const params = new URLSearchParams()
  params.append('email', payload.email)
  params.append('password', payload.password)

  const { data } = await api.post<LoginResponse>("/login", params);
  return data;
}