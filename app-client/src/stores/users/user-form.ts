import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import {
  getUserById,
  createUser,
  updateUser,
} from "@/services/users/users";
import { getStates, getCitiesByState, getStreetTypes } from "@/services/users/locations";
import { toUserCreatePayload, toUserUpdatePayload } from "@/utils";
import { useUserListStore } from "./user-list";
import type {
  ICityItem,
  IStateItem,
  IStreetTypeItem,
  IUserCreatePayload,
  IUserDetail,
  IUserUpdatePayload,
  IUserForm,
} from "@/interfaces";

function defaultForm(): IUserForm {
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

export const useUserFormStore = defineStore("userForm", {
  state: () => ({
    dialog: false,
    formValid: false,
    saving: false,
    form: defaultForm() as IUserForm,
    // selects
    states: [] as IStateItem[],
    cities: [] as ICityItem[],
    streetTypes: [] as IStreetTypeItem[],
    selectedStateCode: null as number | null,
    referencesLoaded: false,
    selectedUserId: null as string | null,
  }),

  getters: {
    isEditing(state): boolean {
      return !!state.selectedUserId;
    },
    currentAddressLabels(state): string {
      const parts: string[] = [];
      if (state.form.address.street) parts.push(state.form.address.street);
      if (state.form.address.neighborhood)
        parts.push(state.form.address.neighborhood);
      return parts.join(" • ");
    },
  },

  actions: {
    async ensureReferenceData() {
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
      await this.ensureReferenceData();
      this.selectedUserId = null;
      this.form = defaultForm();
      this.selectedStateCode = null;
      this.cities = [];
      this.dialog = true;
    },

    async openEdit(id: string) {
      const sb = useSnackbarStore();
      try {
        await this.ensureReferenceData();
        const detail: IUserDetail = await getUserById(id);
        this.selectedUserId = id;
        // Preselect state by acronym to load cities
        const acronym = detail.address?.city?.state?.acronym;
        if (acronym) {
          const st = this.states.find(
            (s) => String(s.acronym).toUpperCase() === String(acronym).toUpperCase()
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
        // Fill form fields
        this.form.name = detail.name;
        this.form.email = detail.email;
        this.form.isActivated = detail.isActivated;
        this.form.role = detail.role;
        if (detail.contact) {
          this.form.contact.country_code = detail.contact.countryCode ?? null;
          this.form.contact.ddd = detail.contact.ddd ?? null;
          this.form.contact.phone_number = detail.contact.phoneNumber ?? "";
        }
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
      const userListStore = useUserListStore();
      this.saving = true;
      try {
        if (this.isEditing && this.selectedUserId) {
          const payload: IUserUpdatePayload = toUserUpdatePayload(this.form);
          await updateUser(this.selectedUserId, payload);
          sb.success("Usuário atualizado com sucesso");
        } else {
          let payload: IUserCreatePayload;
          try {
            payload = toUserCreatePayload(this.form);
          } catch (e: any) {
            sb.error(e?.message || "Formulário inválido");
            return;
          }
          await createUser(payload);
          sb.success("Usuário criado com sucesso");
        }
        this.dialog = false;
        await userListStore.fetchUsers();
      } catch (err: any) {
        sb.error(err?.message || "Falha ao salvar usuário");
      } finally {
        this.saving = false;
      }
    },

    closeDialog() {
      this.dialog = false;
      this.form = defaultForm();
      this.selectedUserId = null;
    },
  },
});