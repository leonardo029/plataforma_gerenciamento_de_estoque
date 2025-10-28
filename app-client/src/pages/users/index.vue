<template>
  <div class="pa-4">
    <UsersToolbar
      :search="search"
      @update:search="search = $event"
      @create="openCreate"
    />

    <UsersTable
      :users="filteredUsers"
      :loading="loading"
      :page="page"
      @update:page="page = $event"
      :limit="limit"
      @update:limit="limit = $event"
      :items-length="itemsLength"
      @edit="openEdit"
      @refresh="fetchUsers"
    />

    <UserEditDialog
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :is-edit="isEdit"
      :form="userForm"
      @update:form="userForm = $event"
      :rules="rules"
      :roles="roles"
      :states="states"
      :cities="cities"
      :street-types="streetTypes"
      :selected-state-code="selectedStateCode"
      @update:selected-state-code="selectedStateCode = $event"
      :current-address-labels="currentAddressLabels"
      @close="closeDialog"
      @submit="submit"
    />

    <AppSnackbar />
  </div>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { useUsersStore } from "@/stores/users/users";
import type { UserListItem } from "@/services/users";

export default {
  name: "UsersPage",
  data() {
    return {
      roles: [
        { title: "Administrador", value: "admin" },
        { title: "Usuário", value: "user" },
      ] as Array<{ title: string; value: string }>,
    };
  },
  computed: {
    ...mapStores(useUsersStore),
    // list & pagination
    filteredUsers(): UserListItem[] {
      return this.usersStore.filteredUsers;
    },
    loading(): boolean {
      return this.usersStore.loading;
    },
    search: {
      get(): string {
        return this.usersStore.search;
      },
      set(v: string) {
        this.usersStore.search = v;
      },
    },
    page: {
      get(): number {
        return this.usersStore.page;
      },
      set(v: number) {
        this.usersStore.page = v;
      },
    },
    limit: {
      get(): number {
        return this.usersStore.limit;
      },
      set(v: number) {
        this.usersStore.limit = v;
      },
    },
    itemsLength(): number {
      return this.usersStore.itemsLength;
    },

    // dialog & form
    dialog: {
      get(): boolean {
        return this.usersStore.dialog;
      },
      set(v: boolean) {
        this.usersStore.dialog = v;
      },
    },
    isEdit(): boolean {
      return this.usersStore.isEdit;
    },
    userForm: {
      get() {
        return this.usersStore.form;
      },
      set(v: any) {
        this.usersStore.form = v;
      },
    },
    rules() {
      return this.usersStore.rules;
    },

    // reference lists
    states() {
      return this.usersStore.states;
    },
    cities() {
      return this.usersStore.cities;
    },
    streetTypes() {
      return this.usersStore.streetTypes;
    },
    selectedStateCode: {
      get(): number | null {
        return this.usersStore.selectedStateCode;
      },
      set(v: number | null) {
        this.usersStore.selectedStateCode = v;
      },
    },
    currentAddressLabels(): string {
      return this.usersStore.currentAddressLabels;
    },
  },
  methods: {
    async fetchUsers(): Promise<void> {
      await this.usersStore.fetchUsers();
    },
    openCreate(): void {
      this.usersStore.openCreate();
    },
    async openEdit(item: UserListItem): Promise<void> {
      await this.usersStore.openEdit(item.id);
    },
    async submit(): Promise<void> {
      await this.usersStore.submit();
    },
    async onDelete(item: UserListItem): Promise<void> {
      await this.usersStore.deleteUserById(item.id);
    },
    closeDialog(): void {
      this.usersStore.closeDialog();
    },
  },
  watch: {
    async page(newVal: number) {
      await this.usersStore.setPage(newVal);
    },
    async limit(newVal: number) {
      await this.usersStore.setLimit(newVal);
    },
    async search(newVal: string) {
      await this.usersStore.setSearch(newVal);
    },
    async selectedStateCode(code: number | null) {
      await this.usersStore.setSelectedStateCode(code ?? null);
    },
  },
  async mounted() {
    await this.usersStore.init();
  },
};
</script>
