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

    <AppSnackbar />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, toRef } from 'vue'
import { useUsersStore } from '@/stores/users'
import type { UserListItem } from '@/services/users'

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Papel', key: 'role' },
  { title: 'Ativo', key: 'isActivated' },
  { title: 'Ações', key: 'actions', sortable: false },
]

const usersStore = useUsersStore()

// list & pagination
const filteredUsers = computed(() => usersStore.filteredUsers)
const loading = toRef(usersStore, 'loading')
const search = toRef(usersStore, 'search')
const page = toRef(usersStore, 'page')
const limit = toRef(usersStore, 'limit')
const itemsLength = computed(() => usersStore.itemsLength)

// dialog & form
const dialog = toRef(usersStore, 'dialog')
const isEdit = toRef(usersStore, 'isEdit')
const formRef = ref()
const userForm = toRef(usersStore, 'form')
const rules = usersStore.rules

// reference lists (via users store)
const states = toRef(usersStore, 'states')
const cities = toRef(usersStore, 'cities')
const streetTypes = toRef(usersStore, 'streetTypes')
const selectedStateCode = toRef(usersStore, 'selectedStateCode')
const currentAddressLabels = computed(() => usersStore.currentAddressLabels)

const roles = [
  { title: 'Administrador', value: 'admin' },
  { title: 'Usuário', value: 'user' },
]

async function fetchUsers() {
  await usersStore.fetchUsers()
}

function openCreate() {
  usersStore.openCreate()
}

async function openEdit(item: UserListItem) {
  await usersStore.openEdit(item.id)
}

async function submit() {
  const form = formRef.value as any
  const valid = await (form?.validate?.() ?? true)
  if (valid === false) return
  await usersStore.submit()
}

async function onDelete(item: UserListItem) {
  await usersStore.deleteUserById(item.id)
}

function closeDialog() {
  usersStore.closeDialog()
  try {
    const form = formRef.value as any
    form?.reset?.()
    form?.resetValidation?.()
  } catch {}
}

watch(page, async (p) => {
  await usersStore.setPage(p)
})

watch(limit, async (l) => {
  await usersStore.setLimit(l)
})

watch(selectedStateCode, async (code) => {
  await usersStore.setSelectedStateCode(code ?? null)
})

onMounted(async () => {
  await usersStore.init()
  await usersStore.loadReferenceData()
})
</script>