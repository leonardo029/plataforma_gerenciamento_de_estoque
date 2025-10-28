import type { ICityItem, IStateItem, IStreetTypeItem } from "@/interfaces";
import api from "../api";

export async function getStates(): Promise<IStateItem[]> {
  const { data } = await api.get("/state");
  return data;
}

export async function getCitiesByState(
  stateCode: number
): Promise<ICityItem[]> {
  const { data } = await api.get(`/city/${stateCode}`);
  return data;
}

export async function getStreetTypes(): Promise<IStreetTypeItem[]> {
  const { data } = await api.get("/address/street-type");
  return data;
}
