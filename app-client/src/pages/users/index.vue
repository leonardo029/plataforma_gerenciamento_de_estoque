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

<script lang="ts">
import { mapStores } from 'pinia'
import { useUsersStore } from '@/stores/users'
import type { UserListItem } from '@/services/users'

type VFormRef = {
  validate?: () => Promise<boolean | { valid: boolean }> | boolean | { valid: boolean }
  reset?: () => void
  resetValidation?: () => void
}

export default {
  name: 'UsersPage',
  data() {
    return {
      headers: [
        { title: 'Nome', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Papel', key: 'role' },
        { title: 'Ativo', key: 'isActivated' },
        { title: 'Ações', key: 'actions', sortable: false },
      ] as const,
      roles: [
        { title: 'Administrador', value: 'admin' },
        { title: 'Usuário', value: 'user' },
      ] as Array<{ title: string; value: string }>,
    }
  },
  computed: {
    ...mapStores(useUsersStore),
    // list & pagination
    filteredUsers(): UserListItem[] { return this.usersStore.filteredUsers },
    loading(): boolean { return this.usersStore.loading },
    search: {
      get(): string { return this.usersStore.search },
      set(v: string) { this.usersStore.search = v },
    },
    page: {
      get(): number { return this.usersStore.page },
      set(v: number) { this.usersStore.page = v },
    },
    limit: {
      get(): number { return this.usersStore.limit },
      set(v: number) { this.usersStore.limit = v },
    },
    itemsLength(): number { return this.usersStore.itemsLength },

    // dialog & form
    dialog: {
      get(): boolean { return this.usersStore.dialog },
      set(v: boolean) { this.usersStore.dialog = v },
    },
    isEdit(): boolean { return this.usersStore.isEdit },
    userForm() { return this.usersStore.form },
    rules() { return this.usersStore.rules },

    // reference lists
    states() { return this.usersStore.states },
    cities() { return this.usersStore.cities },
    streetTypes() { return this.usersStore.streetTypes },
    selectedStateCode: {
      get(): number | null { return this.usersStore.selectedStateCode },
      set(v: number | null) { this.usersStore.selectedStateCode = v },
    },
    currentAddressLabels(): string { return this.usersStore.currentAddressLabels },
  },
  methods: {
    async fetchUsers(): Promise<void> { await this.usersStore.fetchUsers() },
    openCreate(): void { this.usersStore.openCreate() },
    async openEdit(item: UserListItem): Promise<void> { await this.usersStore.openEdit(item.id) },
    async submit(): Promise<void> {
      const form = this.$refs.formRef as VFormRef | undefined
      const res = await (form?.validate?.() ?? true)
      const valid = typeof res === 'boolean' ? res : !!(res as any)?.valid
      if (!valid) return
      await this.usersStore.submit()
    },
    async onDelete(item: UserListItem): Promise<void> { await this.usersStore.deleteUserById(item.id) },
    closeDialog(): void {
      this.usersStore.closeDialog()
      try {
        const form = this.$refs.formRef as VFormRef | undefined
        form?.reset?.()
        form?.resetValidation?.()
      } catch {}
    },
  },
  watch: {
    async page(newVal: number) { await this.usersStore.setPage(newVal) },
    async limit(newVal: number) { await this.usersStore.setLimit(newVal) },
    async search(newVal: string) { await this.usersStore.setSearch(newVal) },
    async selectedStateCode(code: number | null) { await this.usersStore.setSelectedStateCode(code ?? null) },
  },
  async mounted() {
    await this.usersStore.init()
  },
}
</script>