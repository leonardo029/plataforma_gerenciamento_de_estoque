import { defineStore } from "pinia";
import { login as authLogin } from "@/services/auth/auth";
import router from "@/router";

export type AuthUser = {
  name: string;
  email: string;
  role: "admin" | "user";
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    const storedUser = localStorage.getItem("user");
    let user = null;

    try {
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }

    return {
      token: localStorage.getItem("token"),
      user: user,
      loading: false,
      error: null,
    };
  },

  getters: {
    isAuthenticated(state): boolean {
      return !!state.token && !!state.user;
    },
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const res = await authLogin({ email, password });
        this.token = res.access_token;
        this.user = { name: res.name, email: res.email, role: res.role };
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("user", JSON.stringify(this.user));
        return true;
      } catch (err: any) {
        const message = err?.message ?? "Falha ao autenticar";
        this.error = Array.isArray(message) ? message.join(", ") : message;
        this.token = null;
        this.user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return false;
      } finally {
        this.loading = false;
      }
    },
    async loginAndRedirect(email: string, password: string) {
      const ok = await this.login(email, password);
      if (ok) {
        router.push("/dashboard");
      }
      return ok;
    },

    logout() {
      this.token = null;
      this.user = null;
      this.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    logoutAndRedirect() {
      this.logout();
      router.push("/");
    },
  },
});
