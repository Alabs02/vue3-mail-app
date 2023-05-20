import { MutationTree } from "vuex";

// MODELS
import { IMail } from "@/store/models";

export enum EMutations {
  SET_EMAILS = "SET_EMAILS",
  SET_ARCHIVE_EMAILS = "SET_ARCHIVE_EMAILS"
}

const mutations: MutationTree<IMail.IEmailState> = {
  [EMutations.SET_EMAILS]: (state, payload: IMail.IEmail[]) => {
    state.emails = payload;
  },

  [EMutations.SET_ARCHIVE_EMAILS]: (state, payload: IMail.IEmail[]) => {
    state.archivedEmails = payload;
  }
};

export { mutations as default };
