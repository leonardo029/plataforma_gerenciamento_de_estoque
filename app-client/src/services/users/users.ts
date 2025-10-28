import type {
  IUserListItem,
  IUserDetail,
  IUserCreatePayload,
  IUserUpdatePayload,
  IPaginated,
} from "@/interfaces";
import api from "../api";

export const getUsers = async (params?: {
  name?: string;
  page?: number;
  limit?: number;
}): Promise<IPaginated<IUserListItem>> => {
  try {
    const response = await api.get("/user", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users.");
  }
};

export const getUserById = async (id: string): Promise<IUserDetail> => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw new Error("Failed to fetch user details.");
  }
};

export const createUser = async (
  payload: IUserCreatePayload
): Promise<void> => {
  try {
    await api.post("/user", payload);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user.");
  }
};

export const updateUser = async (
  id: string,
  payload: IUserUpdatePayload
): Promise<void> => {
  try {
    await api.patch(`/user/${id}`, payload);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user.");
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await api.delete(`/user/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user.");
  }
};
