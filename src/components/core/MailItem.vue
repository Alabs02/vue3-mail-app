<template>
  <button
    @click="handleOnClick"
    class="mail-item gap-x-24"
    :class="{ 'mail-item--inactive': getEmail?.read }"
  >
    <input
      :checked="getChecked"
      type="checkbox"
      :value="getEmail?.id"
      class="mail-item__input"
      @input="handleEvents($event)"
    />

    <div v-html="getEmail?.body" class="mail-item__copy"></div>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  // MODELS
  import { IMail } from "@/store/models";

  export default defineComponent({
    name: "MailItem",

    props: {
      email: {
        type: Object,
        required: true
      },
      checked: {
        type: Boolean,
        required: true
      }
    },

    data() {
      return {};
    },

    computed: {
      getChecked() {
        return this.checked;
      },

      getEmail() {
        return this.email as IMail.IEmail;
      }
    },

    methods: {
      handleEvents(e: any) {
        if (e.target?.checked) {
          this.$emit("on-select", Number(this.getEmail?.id));
        } else {
          this.$emit("on-deselect", Number(this.getEmail?.id));
        }
      },

      handleOnClick() {
        this.$emit("on-click", this.getEmail);
      }
    }
  });
</script>

<style lang="scss" scoped>
  .mail-item {
    width: 100%;
    height: toRem(45);
    padding: toRem(4) toRem(12);
    background: #ffffff;

    border-bottom: toRem(1) solid;
    border-bottom-color: lighten($color: $secondary-dark, $amount: 30%);

    @include flex-center-start();

    &__copy {
      width: 80%;
      overflow: hidden;
      text-align: left;
      font-size: toRem(14);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover,
    &:focus {
      background: $brand-white;
    }

    &--inactive {
      opacity: 0.5;
    }

    &:last-child {
      border-bottom: none;
    }
  }
</style>
