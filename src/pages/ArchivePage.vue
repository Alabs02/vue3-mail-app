<template>
  <div name="archive-page">
    <tool-bar :title="`Archives ${getArchivedEmailsCount}`" />

    <div class="container">
      <div class="archive-page__heading">Email Selected ({{ getSelectedEmailCount }})</div>

      <div v-if="getHasArchivedMails" class="mail-list">
        <template v-for="email in getArchivedEmails" :key="email.id">
          <mail-item
            :email="email"
            :checked="isChecked(email?.id)"
            @on-click="previewEmail($event)"
            @on-select="selectEmail($event)"
            @on-deselect="deselectEmail($event)"
          />
        </template>
      </div>

      <div v-else class="grid place-items-center my-20"> No archive mails at the moment! </div>
    </div>
  </div>

  <!--  OVERLAYS  -->
  <teleport to="#overlay">
    <WithOverylay @close="toggleOverlay" @on-escape="toggleOverlay" :show-overlay="showOverlay">
      <template #modal>
        <preview-email :email="getSelectedEmail" />
      </template>
    </WithOverylay>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, toRaw } from "vue";
  import { createNamespacedHelpers } from "vuex";

  // COMPONENTS
  import ToolBar from "@/components/core/ToolBar.vue";
  import MailItem from "@/components/core/MailItem.vue";
  import WithOverylay from "@/components/core/WithOverylay.vue";
  import PreviewEmail from "@/components/core/PreviewEmail.vue";

  // MODELS
  import { IMail } from "@/store/models";

  const { mapGetters } = createNamespacedHelpers("mail");

  // If I'm building a real world solution, I'll create and interface for this component and I'll not use any.
  export default defineComponent<any>({
    name: "ArchivePage",

    components: {
      ToolBar,
      MailItem,
      PreviewEmail,
      WithOverylay
    },

    data() {
      return {
        showOverlay: false,
        selectedEmail: {} as IMail.IEmail,
        selectedEmails: [] as number[]
      };
    },

    computed: {
      ...mapGetters(["getArchivedEmails", "getArchivedEmailsCount"]),

      getSelectedEmail() {
        return this.selectedEmail;
      },

      getSelectedEmailCount() {
        return toRaw(this.selectedEmails).length;
      },

      getHasArchivedMails() {
        return this.getArchivedEmails?.length;
      }
    },

    methods: {
      isChecked(id: number) {
        const selectedEmails: number[] = toRaw(this.selectedEmails);

        return selectedEmails.includes(id);
      },

      selectEmail(id: number) {
        let clonedSelectedEmails = toRaw(this.selectedEmails);

        if (!clonedSelectedEmails.includes(id)) {
          clonedSelectedEmails = [...clonedSelectedEmails, id];
          this.selectedEmails = clonedSelectedEmails;
        }
      },

      deselectEmail(id: number) {
        const filteredEmails = toRaw(this.selectedEmails).filter((_id: number) => _id !== id);
        this.selectedEmails = filteredEmails;
      },

      previewEmail(event: IMail.IEmail) {
        this.selectedEmail = event;

        setTimeout(() => {
          this.toggleOverlay();
        }, 0);
      },

      toggleOverlay() {
        this.showOverlay = !this.showOverlay;
      }
    }
  });
</script>

<style lang="scss" scoped>
  .archive-page {
    &__heading {
      color: $primary;
      font-weight: 500;
      font-size: toRem(18);
      letter-spacing: toRem(0.6);
      text-transform: uppercase;
    }
  }

  .mail-list {
    width: 100%;
    padding: toRem(32) 0;
  }
</style>
