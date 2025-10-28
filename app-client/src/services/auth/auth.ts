import type { ILoginPayload, ILoginResponse } from "@/interfaces";
import api from "../api";

export const login = async ({
  email,
  password,
}: ILoginPayload): Promise<ILoginResponse> => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Failed to login. Please check your credentials.");
  }
};
