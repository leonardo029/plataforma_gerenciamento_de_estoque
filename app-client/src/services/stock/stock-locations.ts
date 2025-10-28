import type { IShelfItem, ICorridorItem, ISectionItem } from "@/interfaces";
import api from "../api";

export async function getShelves(): Promise<IShelfItem[]> {
  const { data } = await api.get<IShelfItem[]>("/shelf");
  return data;
}

export async function getCorridors(): Promise<ICorridorItem[]> {
  const { data } = await api.get<ICorridorItem[]>("/corridor");
  return data;
}

export async function getSections(): Promise<ISectionItem[]> {
  const { data } = await api.get<ISectionItem[]>("/section");
  return data;
}
