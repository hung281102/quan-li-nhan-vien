import { createRouter, createWebHistory } from "vue-router";
import Employee from "@/views/Employee.vue";

const routes = [
  {
    path: "/employee",
    name: "Employee",
    component: Employee,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
