import { ActionTree } from "vuex";

// MODELS
import { IMail } from "@/store/models";
import { EMutations } from "./mutations";

// MOCK DATA
import { emails } from "./mock";

const actions: ActionTree<IMail.IEmailState, any> = {
  loadEmails({ commit, state }): void {
    const payload = emails;

    const stateEmailIds = state.emails.map((_email) => _email.id);

    const filteredEmail = payload.filter((_payload) => stateEmailIds.includes(_payload.id));

    if (state.emails.length) commit(EMutations.SET_EMAILS, filteredEmail);
    else commit(EMutations.SET_EMAILS, payload);
  },

  markEmailAsRead({ commit, state }, payload: number[]): void {
    let clonedEmails = [...state.emails];

    const unselectedEmails = clonedEmails.filter((_email) => !payload.includes(_email.id));

    let selectedEmails = clonedEmails.filter((_email) => payload.includes(_email.id));

    const updateEmails = selectedEmails.map((_email) => {
      return {
        ..._email,
        read: true
      };
    });

    const result = [...unselectedEmails, ...updateEmails];
    commit(EMutations.SET_EMAILS, result);
  },

  moveToArchive({ commit, state }, payload: number[]): void {
    let clonedEmails = [...state.emails];

    const unselectedEmails = clonedEmails.filter((_email) => !payload.includes(_email.id));

    const selectedEmails = clonedEmails.filter((_email) => payload.includes(_email.id));

    commit(EMutations.SET_EMAILS, unselectedEmails);
    commit(EMutations.SET_ARCHIVE_EMAILS, selectedEmails);
  }
};

export { actions as default };
