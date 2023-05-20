<template>
  <div name="preview-email">
    <div class="overlay__heading">{{ getEmail.subject }} (Esc)</div>

    <div class="overlay__body" v-html="getEmail.body"></div>
  </div>

  <div class="overlay__footer">
    <button v-show="!getEmail.read" @click="markAsRead" class="btn btn--primary px-24"
      >Mark As Read</button
    >
    <button v-show="!isArchived()" @click="archiveMail" class="btn btn--primary px-24"
      >Archive</button
    >
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { createNamespacedHelpers } from "vuex";

  // MODELS
  import { IMail } from "@/store/models";

  const { mapActions, mapGetters } = createNamespacedHelpers("mail");

  export default defineComponent({
    name: "PreviewEmail",

    props: {
      email: {
        type: Object,
        required: true
      }
    },

    computed: {
      ...mapGetters(["getArchivedEmails"]),

      getEmail() {
        return this.email as IMail.IEmail;
      }
    },

    methods: {
      ...mapActions(["markEmailAsRead", "moveToArchive"]),

      markAsRead() {
        this.markEmailAsRead([this.getEmail.id]);
      },

      isArchived() {
        const archivedEmailIds: number[] = this.getArchivedEmails.map(
          (_email: IMail.IEmail) => _email.id
        );

        return archivedEmailIds.includes(this.getEmail.id);
      },

      archiveMail() {
        this.moveToArchive([this.getEmail.id]);
      }
    }
  });
</script>
