import { GetterTree } from "vuex";

// MODELS
import { IMail } from "@/store/models";

const getters: GetterTree<IMail.IEmailState, any> = {
  getEmails: (state) => state.emails,
  getArchivedEmails: (state) => state.archivedEmails,

  // COUNTS
  getEmailsCount: (state) => state.emails?.length,
  getArchivedEmailsCount: (state) => state.archivedEmails?.length
};

export { getters as default };
