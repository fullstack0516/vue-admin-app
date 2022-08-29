import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import Dashboard from "@/app/dashboard/Dashboard.vue"
import AuthLogin from "@/app/auth/AuthLogin.vue"
import EventPage from "@/app/event/Event.vue"
import PriceHistoryPage from "@/app/event/price-history/PriceHistory.vue"

import { setTitle } from "./helper/dom"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard | Artemis Digital Admin",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: AuthLogin,
    meta: {
      title: "Login | Artemis Digital Admin",
    },
  },
  {
    path: "/events",
    name: "Events",
    component: EventPage,
    meta: {
      title: "Event | Artemis Digital Admin",
    },
  },
  {
    path: "/events/:chainId/:tokenAddress",
    name: "PriceHistory",
    component: PriceHistoryPage,
    meta: {
      title: "Price history | Artemis Digital Admin",
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    setTitle(to.meta.title as string)
  }
  // const isAuthenticated = !!localStorage.getItem(AuthUser.TOKEN)

  // if (!isAuthenticated) next("/login")
  next()
})

export default router
