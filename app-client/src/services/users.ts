import api from './api'

export type UserRole = 'admin' | 'user'

export type UserListItem = {
  id: string
  name: string
  email: string
  role: UserRole
  isActivated: boolean
}

export type UserDetail = {
  id: string
  name: string
  email: string
  role: UserRole
  isActivated: boolean
  contact?: {
    countryCode: number
    ddd: number
    phoneNumber: string
  }
  address?: {
    street: string
    idStreetType?: string
    streetType?: string
    complement?: string | null
    cep: string
    number?: number | null
    neighborhood: string
    idCity?: number
    city?: {
      name: string
      state: {
        name: string
        acronym: string
        region: string
      }
    }
  }
}

export type CreateContactPayload = {
  country_code: number
  ddd: number
  phone_number: string
}

export type CreateAddressPayload = {
  street: string
  idStreetType: string
  complement?: string | null
  cep: string
  number?: number | null
  neighborhood: string
  idCity: number
}

export type UserCreatePayload = {
  name: string
  email: string
  password: string
  isActivated: boolean
  role: UserRole
  contact: CreateContactPayload
  address: CreateAddressPayload
}

export type UserUpdatePayload = Partial<{
  name: string
  email: string
  password: string
  isActivated: boolean
  contact: Partial<CreateContactPayload>
  address: Partial<CreateAddressPayload>
}>

export type Paginated<T> = { items: T[]; total: number; page: number; limit: number }

export async function getUsers(params?: { name?: string; page?: number; limit?: number }): Promise<Paginated<UserListItem>> {
  const { data } = await api.get<Paginated<UserListItem>>('/user', { params })
  return data
}

export async function getUserById(id: string): Promise<UserDetail> {
  const { data } = await api.get<UserDetail>(`/user/${id}`)
  return data
}

export async function createUser(payload: UserCreatePayload): Promise<void> {
  await api.post<void>('/user', payload)
}

export async function updateUser(id: string, payload: UserUpdatePayload): Promise<void> {
  await api.patch<void>(`/user/${id}`, payload)
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete<void>(`/user/${id}`)
}