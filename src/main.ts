import { createApp } from "vue";

// APP
import App from "@/App.vue";

// ROUTER
import router from "@/router";

// STORE
import { store } from "@/store";

// GLOBAL STYLES
import "@/styles/globals.scss";

createApp(App).use(store).use(router).mount("#app");
