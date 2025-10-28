import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/users/users";
import {
  getStates,
  getCitiesByState,
  getStreetTypes,
} from "@/services/users/locations";
import type {
  ICityItem,
  IStateItem,
  IStreetTypeItem,
  IUserCreatePayload,
  IUserDetail,
  IUserListItem,
  IUserUpdatePayload,
} from "@/interfaces";
import type { TUserRole } from "@/utils";

export interface UserForm {
  name: string;
  email: string;
  password: string;
  isActivated: boolean;
  role: TUserRole | null;
  contact: {
    country_code: number | null;
    ddd: number | null;
    phone_number: string;
  };
  address: {
    street: string;
    idStreetType: string | null;
    complement: string | null;
    cep: string;
    number: number | null;
    neighborhood: string;
    idCity: number | null;
  };
}

function defaultForm(): UserForm {
  return {
    name: "",
    email: "",
    password: "",
    isActivated: true,
    role: null,
    contact: { country_code: null, ddd: null, phone_number: "" },
    address: {
      street: "",
      idStreetType: null,
      complement: "",
      cep: "",
      number: null,
      neighborhood: "",
      idCity: null,
    },
  };
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    // List & pagination
    items: [] as IUserListItem[],
    loading: false,
    search: "",
    page: 1,
    limit: 10,
    total: 0,

    // Dialog & form
    dialog: false,
    isEdit: false,
    selectedUserId: null as string | null,
    formValid: false,
    form: defaultForm() as UserForm,

    // Reference lists
    states: [] as IStateItem[],
    cities: [] as ICityItem[],
    streetTypes: [] as IStreetTypeItem[],
    selectedStateCode: null as number | null,
    // Cache flag to prevent duplicate requests for states/street types
    referencesLoaded: false,
  }),

  getters: {
    filteredUsers(state): IUserListItem[] {
      // Server-side search; return items as received
      return state.items;
    },
    itemsLength(state): number {
      // Always rely on server-provided total
      return state.total;
    },
    currentAddressLabels(state): string {
      const parts: string[] = [];
      if (state.form.address.street) parts.push(state.form.address.street);
      if (state.form.address.neighborhood)
        parts.push(state.form.address.neighborhood);
      return parts.join(" • ");
    },
    rules() {
      return {
        required: (v: any) => !!v || v === 0 || "Obrigatório",
        email: (v: string) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email inválido",
        minPassword: (v: string) => v?.length >= 8 || "Mínimo 8 caracteres",
        positiveInt: (v: number) =>
          v == null || (Number.isInteger(+v) && +v > 0) || "Número inválido",
        phone: (v: string) =>
          (v?.length >= 1 && v?.length <= 15) || "1 a 15 caracteres",
        cep: (v: string) => /^\d{8}$/.test(v) || "CEP deve ter 8 dígitos",
      };
    },
  },

  actions: {
    async init() {
      await this.fetchUsers();
    },

    async fetchUsers() {
      const sb = useSnackbarStore();
      try {
        this.loading = true;
        const res = await getUsers({
          name: this.search || undefined,
          page: this.page,
          limit: this.limit,
        });
        this.items = res.items;
        this.total = res.total;
        const lastPage = Math.max(1, Math.ceil(this.total / this.limit));
        if (this.page > lastPage) {
          this.page = lastPage;
        }
      } catch (err: any) {
        sb.error(err?.message || "Falha ao carregar usuários");
      } finally {
        this.loading = false;
      }
    },

    async loadReferenceData() {
      // Lazy-load states and street types; cache to avoid duplicate requests
      if (this.referencesLoaded) return;
      const sb = useSnackbarStore();
      try {
        const [states, streetTypes] = await Promise.all([
          getStates(),
          getStreetTypes(),
        ]);
        this.states = states;
        this.streetTypes = streetTypes;
        this.referencesLoaded = true;
      } catch (err: any) {
        sb.error("Falha ao carregar listas de referência");
      }
    },

    async setSelectedStateCode(code: number | null) {
      const sb = useSnackbarStore();
      this.selectedStateCode = code;
      this.cities = [];
      this.form.address.idCity = null;
      if (!code) return;
      try {
        this.cities = await getCitiesByState(code);
      } catch (err: any) {
        sb.error("Falha ao carregar cidades");
      }
    },

    async openCreate() {
      this.isEdit = false;
      this.selectedUserId = null;
      this.form = defaultForm();
      this.selectedStateCode = null;
      this.cities = [];
      await this.loadReferenceData();
      this.dialog = true;
    },

    async openEdit(id: string) {
      const sb = useSnackbarStore();
      this.isEdit = true;
      this.selectedUserId = id;
      this.form = defaultForm();
      await this.loadReferenceData();
      try {
        const detail: IUserDetail = await getUserById(id);
        this.form.name = detail.name;
        this.form.email = detail.email;
        this.form.isActivated = detail.isActivated;
        this.form.role = detail.role;
        if (detail.contact) {
          this.form.contact.country_code = detail.contact.countryCode ?? null;
          this.form.contact.ddd = detail.contact.ddd ?? null;
          this.form.contact.phone_number = detail.contact.phoneNumber ?? "";
        }
        // Primeiro seleciona o Estado (para carregar cidades) se houver acrônimo
        const acronym = detail.address?.city?.state?.acronym;
        if (acronym) {
          const st = this.states.find(
            (s) =>
              String(s.acronym).toUpperCase() === String(acronym).toUpperCase()
          );
          if (st?.stateCode != null) {
            await this.setSelectedStateCode(st.stateCode);
          } else {
            this.selectedStateCode = null;
            this.cities = [];
          }
        } else {
          this.selectedStateCode = null;
          this.cities = [];
        }
        // Depois preenche os campos de endereço, incluindo cidade
        if (detail.address) {
          this.form.address.street = detail.address.street ?? "";
          this.form.address.complement = detail.address.complement ?? "";
          this.form.address.cep = detail.address.cep ?? "";
          this.form.address.number = detail.address.number ?? null;
          this.form.address.neighborhood = detail.address.neighborhood ?? "";
          this.form.address.idStreetType = detail.address.idStreetType ?? null;
          this.form.address.idCity = detail.address.idCity ?? null;
        }
        this.dialog = true;
      } catch (err: any) {
        sb.error("Falha ao carregar detalhes do usuário");
      }
    },

    async submit() {
      const sb = useSnackbarStore();
      try {
        if (this.isEdit && this.selectedUserId) {
          const payload: IUserUpdatePayload = {};
          payload.name = this.form.name || undefined;
          payload.email = this.form.email || undefined;
          if (this.form.password && this.form.password.length >= 8) {
            payload.password = this.form.password;
          }
          payload.isActivated = this.form.isActivated;

          const contact: any = {};
          if (this.form.contact.country_code != null)
            contact.country_code = this.form.contact.country_code;
          if (this.form.contact.ddd != null)
            contact.ddd = this.form.contact.ddd;
          if (this.form.contact.phone_number)
            contact.phone_number = this.form.contact.phone_number;
          if (Object.keys(contact).length) payload.contact = contact;

          const address: any = {};
          if (this.form.address.street)
            address.street = this.form.address.street;
          if (this.form.address.complement != null)
            address.complement = this.form.address.complement;
          if (this.form.address.cep) address.cep = this.form.address.cep;
          if (this.form.address.number != null)
            address.number = this.form.address.number;
          if (this.form.address.neighborhood)
            address.neighborhood = this.form.address.neighborhood;
          if (this.form.address.idCity)
            address.idCity = this.form.address.idCity;
          if (this.form.address.idStreetType)
            address.idStreetType = this.form.address.idStreetType;
          if (Object.keys(address).length) payload.address = address;

          await updateUser(this.selectedUserId, payload);
          sb.success("Usuário atualizado com sucesso");
        } else {
          if (
            !this.form.role ||
            !this.form.address.idCity ||
            !this.form.address.idStreetType
          ) {
            sb.error("Preencha Papel, Cidade e Tipo de Logradouro");
            return;
          }
          const payload: IUserCreatePayload = {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
            isActivated: this.form.isActivated,
            role: this.form.role,
            contact: {
              country_code: this.form.contact.country_code ?? 55,
              ddd: this.form.contact.ddd ?? 11,
              phone_number: this.form.contact.phone_number,
            },
            address: {
              street: this.form.address.street,
              idStreetType: this.form.address.idStreetType!,
              complement: this.form.address.complement ?? "",
              cep: this.form.address.cep,
              number: this.form.address.number ?? null,
              neighborhood: this.form.address.neighborhood,
              idCity: this.form.address.idCity!,
            },
          };
          await createUser(payload);
          sb.success("Usuário criado com sucesso");
        }
        this.dialog = false;
        await this.fetchUsers();
      } catch (err: any) {
        sb.error(err?.message || "Falha ao salvar usuário");
      }
    },

    async deleteUserById(id: string) {
      const sb = useSnackbarStore();
      try {
        await deleteUser(id);
        sb.success("Usuário excluído com sucesso");
        await this.fetchUsers();
      } catch (err: any) {
        sb.error("Falha ao excluir usuário");
      }
    },

    closeDialog() {
      this.dialog = false;
    },

    // Setters with side-effects
    async setSearch(v: string) {
      this.search = v;
      this.page = 1;
      await this.fetchUsers();
    },
    async setPage(v: number) {
      this.page = v;
      await this.fetchUsers();
    },
    async setLimit(v: number) {
      this.limit = v;
      this.page = 1;
      await this.fetchUsers();
    },
  },
});
