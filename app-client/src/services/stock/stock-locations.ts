import type { IShelfItem, ICorridorItem, ISectionItem } from "@/interfaces";
import api from "../api";

export const getShelves = async (): Promise<IShelfItem[]> => {
  try {
    const response = await api.get("/shelf");
    return response.data;
  } catch (error) {
    console.error("Error fetching shelves:", error);
    throw new Error("Failed to fetch shelves.");
  }
};

export const getCorridors = async (): Promise<ICorridorItem[]> => {
  try {
    const response = await api.get("/corridor");
    return response.data;
  } catch (error) {
    console.error("Error fetching corridors:", error);
    throw new Error("Failed to fetch corridors.");
  }
};

export const getSections = async (): Promise<ISectionItem[]> => {
  try {
    const response = await api.get("/section");
    return response.data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw new Error("Failed to fetch sections.");
  }
};
