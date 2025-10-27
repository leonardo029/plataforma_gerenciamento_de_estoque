/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";

const routes = [
  {
    name: "Login",
    path: "/",
    component: () => import("@/pages/index.vue"),
    meta: { layout: 'blank'}
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: () => import("@/pages/dashboard/index.vue"),
    meta: { layout: 'default'}
  },
  {
    name: "Stocks",
    path: "/stocks",
    component: () => import("@/pages/stocks/index.vue"),
    meta: { layout: 'default' }
  },
  {
    name: "Products",
    path: "/products",
    component: () => import("@/pages/products/index.vue"),
    meta: { layout: 'default'}
  },
  {
    name: "Users",
    path: "/users",
    component: () => import("@/pages/users/index.vue"),
    meta: { layout: 'default', roles: ['admin'] }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (localStorage.getItem("vuetify:dynamic-reload")) {
      console.error("Dynamic import error, reloading page did not fix it", err);
    } else {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // Auth guard
  if (to.path !== '/' && !token) {
    next({ path: '/' })
    return
  }

  // Role guard (if route declares roles)
  const roles = (to.meta as any)?.roles as string[] | undefined
  if (roles) {
    const routeRoles = roles.map(r => String(r).toLowerCase())
    let userRole: string | null = null
    try {
      const userStr = localStorage.getItem('user')
      const user = userStr ? JSON.parse(userStr) : null
      userRole = user?.role ?? null
    } catch {}

    if (!userRole || !routeRoles.includes(String(userRole).toLowerCase())) {
      next({ path: '/dashboard' })
      return
    }
  }

  next()
})

export default router;
