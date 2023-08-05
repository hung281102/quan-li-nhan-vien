import { createRouter, createWebHistory } from "vue-router";
import Employee from "@/views/Employee.vue";
import Account from "@/views/Account.vue";

const routes = [
  {
    path: "/employee",
    name: "Employee",
    component: Employee,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
