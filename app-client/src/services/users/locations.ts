import type { ICityItem, IStateItem, IStreetTypeItem } from "@/interfaces";
import api from "../api";

export const getStates = async (): Promise<IStateItem[]> => {
  try {
    const response = await api.get("/state");
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw new Error("Failed to fetch states.");
  }
};

export const getCitiesByState = async (
  stateCode: number
): Promise<ICityItem[]> => {
  try {
    const response = await api.get(`/city/${stateCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Failed to fetch cities.");
  }
};

export const getStreetTypes = async (): Promise<IStreetTypeItem[]> => {
  try {
    const response = await api.get("/address/street-type");
    return response.data;
  } catch (error) {
    console.error("Error fetching street types:", error);
    throw new Error("Failed to fetch street types.");
  }
};
