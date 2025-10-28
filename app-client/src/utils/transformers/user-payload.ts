import type { IUserForm, IUserCreatePayload, IUserUpdatePayload } from "@/interfaces";

export const toUserCreatePayload = (form: IUserForm): IUserCreatePayload => {
  if (!form.role || !form.address.idCity || !form.address.idStreetType) {
    throw new Error("Formulário incompleto: papel, cidade e tipo de logradouro são obrigatórios.");
  }
  return {
    name: form.name,
    email: form.email,
    password: form.password,
    isActivated: form.isActivated,
    role: form.role,
    contact: {
      country_code: form.contact.country_code ?? 55,
      ddd: form.contact.ddd ?? 11,
      phone_number: form.contact.phone_number,
    },
    address: {
      street: form.address.street,
      idStreetType: form.address.idStreetType!,
      complement: form.address.complement ?? "",
      cep: form.address.cep,
      number: form.address.number ?? null,
      neighborhood: form.address.neighborhood,
      idCity: form.address.idCity!,
    },
  };
};

export const toUserUpdatePayload = (form: IUserForm): IUserUpdatePayload => {
  const payload: IUserUpdatePayload = {};
  payload.name = form.name || undefined;
  payload.email = form.email || undefined;
  if (form.password && form.password.length >= 8) {
    payload.password = form.password;
  }
  payload.isActivated = form.isActivated;

  const contact: any = {};
  if (form.contact.country_code != null) contact.country_code = form.contact.country_code;
  if (form.contact.ddd != null) contact.ddd = form.contact.ddd;
  if (form.contact.phone_number) contact.phone_number = form.contact.phone_number;
  if (Object.keys(contact).length) payload.contact = contact;

  const address: any = {};
  if (form.address.street) address.street = form.address.street;
  if (form.address.complement != null) address.complement = form.address.complement;
  if (form.address.cep) address.cep = form.address.cep;
  if (form.address.number != null) address.number = form.address.number;
  if (form.address.neighborhood) address.neighborhood = form.address.neighborhood;
  if (form.address.idCity) address.idCity = form.address.idCity;
  if (form.address.idStreetType) address.idStreetType = form.address.idStreetType;
  if (Object.keys(address).length) payload.address = address;

  return payload;
};