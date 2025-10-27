import api from './api'

export type ShelfItem = { id: string; name: string };
export type CorridorItem = { id: string; name: string };
export type SectionItem = { id: string; name: string };

export async function getShelves(): Promise<ShelfItem[]> {
  const { data } = await api.get<ShelfItem[]>('/shelf');
  return data;
}

export async function getCorridors(): Promise<CorridorItem[]> {
  const { data } = await api.get<CorridorItem[]>('/corridor');
  return data;
}

export async function getSections(): Promise<SectionItem[]> {
  const { data } = await api.get<SectionItem[]>('/section');
  return data;
}