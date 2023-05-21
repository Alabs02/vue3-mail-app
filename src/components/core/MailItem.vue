<template>
  <div class="mail-item gap-x-12 px-12" :class="{ 'mail-item--inactive': getEmail?.read }">
    <div class="grid place-items-center py-4">
      <input
      :checked="getChecked"
      type="checkbox"
      :value="getEmail?.id"
      class="mail-item__input"
      @input="handleEvents($event)"
    />
    </div>


    <button
      @click="handleOnClick"
      class="mail-item__btn"
    >
      <div v-html="getEmail?.body" class="mail-item__btn-copy"></div>
    </button>
  </div>
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
    background: #ffffff;
    overflow: hidden;

    border-bottom: toRem(1) solid;
    border-bottom-color: lighten($color: $secondary-dark, $amount: 30%);

    @include flex-center-start();

    &__btn {
      flex: 1 1 0%;
      width: 100%;
      height: 100%;

      &-copy {
        width: 85%;
        overflow: hidden;
        text-align: left;
        font-size: toRem(14);
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &:hover,
    &:focus,
    &:focus-within {
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
