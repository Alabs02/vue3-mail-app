// MODELS
import { IMail } from "@/store/models";

const initialState = (): IMail.IEmailState => ({
  emails: [],
  archivedEmails: []
});

export { initialState as default };
