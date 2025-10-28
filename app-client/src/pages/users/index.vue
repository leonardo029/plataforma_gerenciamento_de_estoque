<template>
  <div class="pa-4">
    <UsersToolbar
      :search="search"
      @update:search="search = $event"
      @create="openCreate"
    />

    <UsersTable
      :users="users"
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
import { useUserListStore } from "@/stores/users/user-list";
import { useUserFormStore } from "@/stores/users/user-form";
import { userRules } from "@/utils";
import type { IUserListItem } from "@/interfaces";

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
    ...mapStores(useUserListStore, useUserFormStore),
    // list & pagination
    users(): IUserListItem[] {
      return this.userListStore.users;
    },
    loading(): boolean {
      return this.userListStore.loading;
    },
    search: {
      get(): string {
        return this.userListStore.search;
      },
      set(v: string) {
        this.userListStore.search = v;
      },
    },
    page: {
      get(): number {
        return this.userListStore.page;
      },
      set(v: number) {
        this.userListStore.page = v;
      },
    },
    limit: {
      get(): number {
        return this.userListStore.limit;
      },
      set(v: number) {
        this.userListStore.limit = v;
      },
    },
    itemsLength(): number {
      return this.userListStore.total;
    },

    // dialog & form
    dialog: {
      get(): boolean {
        return this.userFormStore.dialog;
      },
      set(v: boolean) {
        this.userFormStore.dialog = v;
      },
    },
    isEdit(): boolean {
      return this.userFormStore.isEditing;
    },
    userForm: {
      get() {
        return this.userFormStore.form;
      },
      set(v: any) {
        this.userFormStore.form = v;
      },
    },
    rules() {
      return userRules;
    },

    // reference lists
    states() {
      return this.userFormStore.states;
    },
    cities() {
      return this.userFormStore.cities;
    },
    streetTypes() {
      return this.userFormStore.streetTypes;
    },
    selectedStateCode: {
      get(): number | null {
        return this.userFormStore.selectedStateCode;
      },
      set(v: number | null) {
        this.userFormStore.selectedStateCode = v;
      },
    },
    currentAddressLabels(): string {
      return this.userFormStore.currentAddressLabels;
    },
  },
  methods: {
    async fetchUsers(): Promise<void> {
      await this.userListStore.fetchUsers();
    },
    openCreate(): void {
      this.userFormStore.openCreate();
    },
    async openEdit(item: IUserListItem): Promise<void> {
      await this.userFormStore.openEdit(item.id);
    },
    async submit(): Promise<void> {
      await this.userFormStore.submit();
    },
    async onDelete(item: IUserListItem): Promise<void> {
      await this.userListStore.deleteUserById(item.id);
    },
    closeDialog(): void {
      this.userFormStore.closeDialog();
    },
  },
  watch: {
    async page(newVal: number) {
      await this.userListStore.setPage(newVal);
    },
    async limit(newVal: number) {
      await this.userListStore.setLimit(newVal);
    },
    async search(newVal: string) {
      await this.userListStore.setSearch(newVal);
    },
    async selectedStateCode(code: number | null) {
      await this.userFormStore.setSelectedStateCode(code ?? null);
    },
  },
  async mounted() {
    await this.userListStore.fetchUsers();
  },
};
</script>
