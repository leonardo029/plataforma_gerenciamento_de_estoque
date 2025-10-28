import type { ILoginPayload, ILoginResponse } from "@/interfaces";
import api from "../api";

export async function login(payload: ILoginPayload): Promise<ILoginResponse> {
  const params = new URLSearchParams();
  params.append("email", payload.email);
  params.append("password", payload.password);

  const { data } = await api.post<ILoginResponse>("/login", params);
  return data;
}
