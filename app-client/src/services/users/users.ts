import type {
  IUserListItem,
  IUserDetail,
  IUserCreatePayload,
  IUserUpdatePayload,
  IPaginated,
} from "@/interfaces";
import api from "../api";

export async function getUsers(params?: {
  name?: string;
  page?: number;
  limit?: number;
}): Promise<IPaginated<IUserListItem>> {
  const { data } = await api.get<IPaginated<IUserListItem>>("/user", {
    params,
  });
  return data;
}

export async function getUserById(id: string): Promise<IUserDetail> {
  const { data } = await api.get<IUserDetail>(`/user/${id}`);
  return data;
}

export async function createUser(payload: IUserCreatePayload): Promise<void> {
  await api.post<void>("/user", payload);
}

export async function updateUser(
  id: string,
  payload: IUserUpdatePayload
): Promise<void> {
  await api.patch<void>(`/user/${id}`, payload);
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete<void>(`/user/${id}`);
}
