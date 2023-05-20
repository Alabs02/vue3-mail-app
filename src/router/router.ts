import { createRouter, createWebHistory } from "vue-router";

// ROUTES
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export { router as default };
