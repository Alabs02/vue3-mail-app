import { Module } from "vuex";

// MODELS
import { IMail } from "@/store/models";

import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const mailModule: Module<IMail.IEmailState, any> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};

export { mailModule as default };
