<template>
  <router-link class="nav-link" :to="getTo" active-class="nav-link--active">
    <span class="nav-link__title">{{ getTitle }}</span>
  </router-link>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "NavLink",

    props: {
      to: {
        type: String,
        required: true
      },
      class: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        required: true
      }
    },

    computed: {
      getTo(): string {
        return this.to;
      },

      getTitle(): string {
        return this.title;
      },

      getClass(): string {
        return this.class;
      }
    }
  });
</script>

<style lang="scss" scoped>
  .nav-link {
    display: block;
    width: 100%;
    padding: 16px 24px;

    font-weight: 500;
    font-size: toRem(18);
    letter-spacing: toRem(0.5);

    color: $secondary-dark;
    background: darken($color: $secondary-light, $amount: 1%);

    &:hover,
    &:focus {
      @extend .nav-link--active;
    }

    &--active {
      color: $primary;
      background: lighten($color: $primary, $amount: 40%);
    }

    &__title {
      color: inherit;
      font-size: inherit;
    }
  }
</style>
