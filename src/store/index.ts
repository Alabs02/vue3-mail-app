import { createStore, createLogger } from "vuex";

// STORE MODULES
import { mail } from "./modules";

const isDevMode = process.env.NODE_ENV === "development";

const vuexLogger = isDevMode ? createLogger() : () => {};

const store = createStore({
  plugins: [vuexLogger],

  // STORE MODULES
  modules: {
    mail
  }
});

export { store, isDevMode };
