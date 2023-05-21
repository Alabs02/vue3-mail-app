<template>
  <div name="inbox-page" class="inbox-page">
    <tool-bar :title="`Inbox (${getEmailsCount})`" />

    <div class="container">
      <div class="inbox-page__heading">Email Selected ({{ getSelectedEmailCount }})</div>

      <div class="panel wf-100 h-80 my-24 gap-x-16 px-24">
        <input type="checkbox" @input="selectAllEmails($event)" />

        <button
          @click="markAsRead"
          class="text-btn text-btn--primary"
          :disabled="!getHasSelectedEmails"
          >Mark all as read (R)</button
        >

        <button
          @click="moveEmailsToArchive"
          class="text-btn text-btn--primary"
          :disabled="!getHasSelectedEmails"
          >Archive (A)</button
        >
      </div>

      <div class="mail-list">
        <template v-for="email in getEmails" :key="email.id">
          <mail-item
            :email="email"
            :checked="isChecked(email?.id)"
            @on-click="previewEmail($event)"
            @on-select="selectEmail($event)"
            @on-deselect="deselectEmail($event)"
          />
        </template>
      </div>
    </div>
  </div>

  <!--  OVERLAYS  -->
  <teleport to="#overlay">
    <WithOverylay @close="closeOverlay" @on-escape="closeOverlay" :show-overlay="showOverlay">
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

  const { mapActions, mapGetters } = createNamespacedHelpers("mail");

  // If I'm building a real world solution, I'll create and interface for this component and I'll not use any.
  export default defineComponent<any>({
    name: "InboxPage",

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
      ...mapGetters(["getEmails", "getEmailsCount"]),

      getHasSelectedEmails() {
        return !!toRaw(this.selectedEmails)?.length;
      },

      getSelectedEmails() {
        return this.selectedEmails;
      },

      getSelectedEmail() {
        return this.selectedEmail;
      },

      getRawSelectedEmails() {
        return toRaw(this.selectedEmails);
      },

      getSelectedEmailCount() {
        return toRaw(this.getSelectedEmails).length;
      }
    },

    created() {
      this.loadEmails();
    },

    methods: {
      ...mapActions(["loadEmails", "markEmailAsRead", "moveToArchive"]),

      selectAllEmails(e: any) {
        const rawEmails = toRaw(this.getEmails);

        if (e?.target?.checked) {
          this.selectedEmails = rawEmails.map((_email: IMail.IEmail) => _email?.id);
        } else {
          this.selectedEmails = [];
        }
      },

      markAsRead() {
        this.markEmailAsRead(this.getRawSelectedEmails);
      },

      moveEmailsToArchive() {
        this.moveToArchive(this.getRawSelectedEmails);
      },

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
          this.openOverlay();
        }, 0);
      },

      openOverlay() {
        this.showOverlay = true;
      },

      closeOverlay() {
        this.showOverlay = false;
      }
    }
  });
</script>

<style lang="scss" scoped>
  .inbox-page {
    &__heading {
      color: $primary;
      font-weight: 500;
      font-size: toRem(18);
      letter-spacing: toRem(0.6);
      text-transform: uppercase;
    }
  }

  .panel {
    background: #ffffff;
    border-radius: toRem(5);
    @include flex-center-start();
  }

  .mail-list {
    width: 100%;
    padding: toRem(8) 0;
  }
</style>
