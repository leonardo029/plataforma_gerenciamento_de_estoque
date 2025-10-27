<template>
  <div class="pa-4">
    <v-toolbar density="comfortable" color="transparent" class="mb-4">
      <v-toolbar-title>Usuários</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Pesquisar por nome/email"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        density="comfortable"
        style="max-width: 320px"
      />
      <v-btn color="primary" class="ml-4" @click="openCreate">
        <v-icon icon="mdi-plus" class="mr-2" />
        Novo Usuário
      </v-btn>
    </v-toolbar>

    <v-data-table-server
      :items="filteredUsers"
      :headers="headers"
      item-key="id"
      :loading="loading"
      v-model:page="page"
      v-model:items-per-page="limit"
      :items-length="itemsLength"
      class="elevation-1"
    >
      <template #item.isActivated="{ item }">
        <v-chip :color="item.isActivated ? 'success' : 'warning'" size="small">
          {{ item.isActivated ? 'Ativo' : 'Inativo' }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-btn icon variant="text" color="primary" @click="openEdit(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <!-- Removido botão de excluir -->
      </template>

      <!-- Refresh button next to Items per page -->
      <template #footer.prepend>
        <v-btn
          icon="mdi-refresh"
          variant="text"
          size="small"
          :loading="loading"
          class="mr-2"
          @click="fetchUsers"
          aria-label="Atualizar"
        />
        <v-spacer />
      </template>
    </v-data-table-server>

    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ isEdit ? 'Editar Usuário' : 'Novo Usuário' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef">
            <div class="mb-2 text-subtitle-2">Dados do usuário</div>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="userForm.name" label="Nome" :rules="[rules.required]" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="userForm.email" label="Email" :rules="[rules.required, rules.email]" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="userForm.password" type="password" label="Senha" :hint="isEdit ? 'Deixe em branco para manter' : ''" :rules="isEdit ? [] : [rules.required, rules.minPassword]" />
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="userForm.role"
                  :items="roles"
                  label="Papel"
                  :disabled="isEdit"
                  :rules="isEdit ? [] : [rules.required]"
                />
              </v-col>
              <v-col cols="12" md="3" class="d-flex align-center">
                <v-switch v-model="userForm.isActivated" inset label="Ativo" />
              </v-col>
            </v-row>

            <div class="mt-4 mb-2 text-subtitle-2">Contato</div>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="userForm.contact.country_code" type="number" label="Código do País" :rules="[rules.positiveInt]" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="userForm.contact.ddd" type="number" label="DDD" :rules="[rules.positiveInt]" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="userForm.contact.phone_number" label="Telefone" :rules="[rules.phone]" />
              </v-col>
            </v-row>

            <div class="mt-4 mb-2 text-subtitle-2">Endereço</div>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  v-model="selectedStateCode"
                  :items="states"
                  item-title="name"
                  item-value="stateCode"
                  label="Estado"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="userForm.address.idCity"
                  :items="cities"
                  item-title="name"
                  item-value="id"
                  label="Cidade"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="userForm.address.idStreetType"
                  :items="streetTypes"
                  item-title="name"
                  item-value="id"
                  label="Tipo de Logradouro"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="userForm.address.street" label="Logradouro" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="userForm.address.complement" label="Complemento" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="userForm.address.cep" label="CEP" :rules="[rules.cep]" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="userForm.address.number" type="number" label="Número" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="userForm.address.neighborhood" label="Bairro" />
              </v-col>
              <v-col cols="12">
                <div v-if="isEdit && currentAddressLabels" class="text-caption text-medium-emphasis">
                  Atual: {{ currentAddressLabels }}
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="submit">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { getUsers, getUserById, createUser, updateUser, deleteUser, type UserListItem, type UserUpdatePayload, type UserCreatePayload } from '@/services/users';
import { getStates, getCitiesByState, getStreetTypes, type StateItem, type CityItem, type StreetTypeItem } from '@/services/locations';

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Papel', key: 'role' },
  { title: 'Ativo', key: 'isActivated' },
  { title: 'Ações', key: 'actions', sortable: false },
];

const loading = ref(false);
const search = ref('');
const items = ref<UserListItem[]>([]);
const page = ref(1);
const limit = ref(10);
const total = ref(0);
const itemsLength = computed(() => (search.value ? filteredUsers.value.length : total.value));

const filteredUsers = computed(() => {
  const term = search.value.toLowerCase();
  if (!term) return items.value;
  return items.value.filter(u =>
    u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
  );
});

 const dialog = ref(false);
 const isEdit = ref(false);
 const selectedUserId = ref<string | null>(null);

 const roles = [
   { title: 'Administrador', value: 'admin' },
   { title: 'Usuário', value: 'user' },
 ];

 const states = ref<StateItem[]>([]);
 const cities = ref<CityItem[]>([]);
 const streetTypes = ref<StreetTypeItem[]>([]);
 const selectedStateCode = ref<number | null>(null);

 const formRef = ref();
 const userForm = ref<{
   name: string;
   email: string;
   password: string;
   isActivated: boolean;
   role: 'admin' | 'user' | null;
   contact: { country_code: number | null; ddd: number | null; phone_number: string };
   address: { street: string; idStreetType: string | null; complement: string | null; cep: string; number: number | null; neighborhood: string; idCity: number | null };
 }>({
   name: '',
   email: '',
   password: '',
   isActivated: true,
   role: null,
   contact: { country_code: null, ddd: null, phone_number: '' },
   address: { street: '', idStreetType: null, complement: '', cep: '', number: null, neighborhood: '', idCity: null },
 })

 const currentAddressLabels = computed(() => {
   if (!isEdit.value) return '';
   const parts: string[] = [];
   if (userForm.value.address.street) parts.push(userForm.value.address.street);
   if (userForm.value.address.neighborhood) parts.push(userForm.value.address.neighborhood);
   return parts.join(' • ');
 })

 const rules = {
   required: (v: any) => (!!v || v === 0) || 'Obrigatório',
   email: (v: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email inválido'),
   minPassword: (v: string) => (v?.length >= 8 || 'Mínimo 8 caracteres'),
   positiveInt: (v: number) => (v == null || (Number.isInteger(+v) && +v > 0)) || 'Número inválido',
   phone: (v: string) => (v?.length >= 1 && v?.length <= 15) || '1 a 15 caracteres',
   cep: (v: string) => (/^\d{8}$/.test(v) || 'CEP deve ter 8 dígitos'),
 };

 async function fetchUsers() {
  loading.value = true;
  try {
    const res = await getUsers({ page: page.value, limit: limit.value });
    items.value = res.items;
    total.value = res.total;
    const lastPage = Math.max(1, Math.ceil(total.value / limit.value));
    if (page.value > lastPage) {
      page.value = lastPage;
      // watcher on page will refetch
    }
  } catch (err: any) {
    showError(err?.message || 'Falha ao carregar usuários');
  } finally {
    loading.value = false;
  }
}
 
watch(page, async () => {
  await fetchUsers();
});

watch(limit, async () => {
  page.value = 1;
  await fetchUsers();
});

 function resetForm() {
   userForm.value = {
     name: '',
     email: '',
     password: '',
     isActivated: true,
     role: null,
     contact: { country_code: null, ddd: null, phone_number: '' },
     address: { street: '', idStreetType: null, complement: '', cep: '', number: null, neighborhood: '', idCity: null },
   };
   selectedStateCode.value = null;
   cities.value = [];
 }

 async function loadReferenceData() {
   try {
     [states.value, streetTypes.value] = await Promise.all([
       getStates(),
       getStreetTypes(),
     ]);
   } catch (err: any) {
     showError('Falha ao carregar listas de referência');
   }
 }

 async function openCreate() {
   isEdit.value = false;
   selectedUserId.value = null;
   resetForm();
   await loadReferenceData();
   dialog.value = true;
 }

 async function openEdit(item: UserListItem) {
   isEdit.value = true;
   selectedUserId.value = item.id;
   resetForm();
   await loadReferenceData();
   try {
     const detail = await getUserById(item.id);
     userForm.value.name = detail.name;
     userForm.value.email = detail.email;
     userForm.value.isActivated = detail.isActivated;
     userForm.value.role = detail.role;
     if (detail.contact) {
       userForm.value.contact.country_code = detail.contact.countryCode ?? null;
       userForm.value.contact.ddd = detail.contact.ddd ?? null;
       userForm.value.contact.phone_number = detail.contact.phoneNumber ?? '';
     }
     if (detail.address) {
       userForm.value.address.street = detail.address.street ?? '';
       userForm.value.address.complement = detail.address.complement ?? '';
       userForm.value.address.cep = detail.address.cep ?? '';
       userForm.value.address.number = detail.address.number ?? null;
       userForm.value.address.neighborhood = detail.address.neighborhood ?? '';
       userForm.value.address.idStreetType = detail.address.idStreetType ?? null;
       userForm.value.address.idCity = detail.address.idCity ?? null;
     }
     dialog.value = true;
   } catch (err: any) {
     showError('Falha ao carregar detalhes do usuário');
   }
 }

 watch(selectedStateCode, async (code) => {
   if (!code) {
     cities.value = [];
     userForm.value.address.idCity = null;
     return;
   }
   try {
     cities.value = await getCitiesByState(code);
   } catch (err: any) {
     showError('Falha ao carregar cidades');
   }
 });

 async function submit() {
   const form = formRef.value as any;
   const valid = await (form?.validate?.() ?? true);
   if (valid === false) return;

   try {
     if (isEdit.value && selectedUserId.value) {
       const payload: UserUpdatePayload = {};
       payload.name = userForm.value.name || undefined;
       payload.email = userForm.value.email || undefined;
       if (userForm.value.password && userForm.value.password.length >= 8) {
         payload.password = userForm.value.password;
       }
       payload.isActivated = userForm.value.isActivated;

       const contact: any = {};
       if (userForm.value.contact.country_code != null) contact.country_code = userForm.value.contact.country_code;
       if (userForm.value.contact.ddd != null) contact.ddd = userForm.value.contact.ddd;
       if (userForm.value.contact.phone_number) contact.phone_number = userForm.value.contact.phone_number;
       if (Object.keys(contact).length) payload.contact = contact;

       const address: any = {};
       if (userForm.value.address.street) address.street = userForm.value.address.street;
       if (userForm.value.address.complement != null) address.complement = userForm.value.address.complement;
       if (userForm.value.address.cep) address.cep = userForm.value.address.cep;
       if (userForm.value.address.number != null) address.number = userForm.value.address.number;
       if (userForm.value.address.neighborhood) address.neighborhood = userForm.value.address.neighborhood;
       if (userForm.value.address.idCity) address.idCity = userForm.value.address.idCity;
       if (userForm.value.address.idStreetType) address.idStreetType = userForm.value.address.idStreetType;
       if (Object.keys(address).length) payload.address = address;

       await updateUser(selectedUserId.value, payload);
       showSuccess('Usuário atualizado com sucesso');
     } else {
       if (!userForm.value.role || !userForm.value.address.idCity || !userForm.value.address.idStreetType) {
         showError('Preencha Papel, Cidade e Tipo de Logradouro');
         return;
       }
       const payload: UserCreatePayload = {
         name: userForm.value.name,
         email: userForm.value.email,
         password: userForm.value.password,
         isActivated: userForm.value.isActivated,
         role: userForm.value.role,
         contact: {
           country_code: userForm.value.contact.country_code ?? 55,
           ddd: userForm.value.contact.ddd ?? 11,
           phone_number: userForm.value.contact.phone_number,
         },
         address: {
           street: userForm.value.address.street,
           idStreetType: userForm.value.address.idStreetType,
           complement: userForm.value.address.complement ?? '',
           cep: userForm.value.address.cep,
           number: userForm.value.address.number ?? null,
           neighborhood: userForm.value.address.neighborhood,
           idCity: userForm.value.address.idCity,
         },
       };
       await createUser(payload);
       showSuccess('Usuário criado com sucesso');
     }
     dialog.value = false;
     await fetchUsers();
   } catch (err: any) {
     showError(err?.message || 'Falha ao salvar usuário');
   }
 }

 async function onDelete(item: UserListItem) {
   if (!confirm(`Deseja excluir o usuário ${item.name}?`)) return;
   try {
     await deleteUser(item.id);
     showSuccess('Usuário excluído com sucesso');
     await fetchUsers();
   } catch (err: any) {
     showError('Falha ao excluir usuário');
   }
 }

 const snackbar = ref({ show: false, color: 'success', text: '' });
 function showSuccess(text: string) {
   snackbar.value = { show: true, color: 'success', text };
 }
 function showError(text: string) {
   snackbar.value = { show: true, color: 'error', text };
 }

 function closeDialog() {
   dialog.value = false;
 }

 onMounted(async () => {
   await fetchUsers();
 });
</script>