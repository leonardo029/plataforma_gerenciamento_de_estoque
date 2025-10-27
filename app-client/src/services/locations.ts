import api from './api';

export type StateItem = {
  stateCode: number;
  acronym: string;
  name: string;
};

export type CityItem = {
  id: number;
  name: string;
};

export type StreetTypeItem = {
  id: string;
  name: string;
};

export async function getStates(): Promise<StateItem[]> {
  const { data } = await api.get('/state');
  return data;
}

export async function getCitiesByState(stateCode: number): Promise<CityItem[]> {
  const { data } = await api.get(`/city/${stateCode}`);
  return data;
}

export async function getStreetTypes(): Promise<StreetTypeItem[]> {
  const { data } = await api.get('/address/street-type');
  return data;
}