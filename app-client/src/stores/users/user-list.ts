import { defineStore } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar/snackbar";
import { getUsers, deleteUser } from "@/services/users/users";
import type { IUserListItem } from "@/interfaces";

export const useUserListStore = defineStore("userList", {
  state: () => ({
    users: [] as IUserListItem[],
    loading: false,
    search: "",
    page: 1,
    limit: 10,
    total: 0,
    searchDebounce: null as any,
  }),

  actions: {
    async fetchUsers() {
      const sb = useSnackbarStore();
      try {
        this.loading = true;
        const { items, total, page, limit } = await getUsers({
          name: this.search || undefined,
          page: this.page,
          limit: this.limit,
        });
        this.users = items;
        this.total = total;
        this.page = page;
        this.limit = limit;
      } catch (err: any) {
        sb.error(err?.message || "Falha ao carregar usuários");
      } finally {
        this.loading = false;
      }
    },

    setSearch(value: string) {
      this.search = value;
      clearTimeout(this.searchDebounce);
      this.searchDebounce = setTimeout(async () => {
        this.page = 1;
        await this.fetchUsers();
      }, 500);
    },

    async setLimit(value: number) {
      this.limit = value;
      this.page = 1;
      await this.fetchUsers();
    },

    async setPage(value: number) {
      this.page = value;
      await this.fetchUsers();
    },

    async deleteUserById(id: string) {
      const sb = useSnackbarStore();
      try {
        await deleteUser(id);
        sb.success("Usuário removido com sucesso");
        await this.fetchUsers();
      } catch (err: any) {
        sb.error(err?.message || "Falha ao remover usuário");
      }
    },
  },
});