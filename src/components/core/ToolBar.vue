<template>
  <div name="toolbar" class="toolbar" :class="getClass">
    <div class="toolbar__title">{{ getTitle }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Toolbar",

    props: {
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
  .toolbar {
    width: 100%;
    height: toRem(60);
    padding: 0 toRem(32);

    font-weight: 500;
    font-size: toRem(20);
    text-transform: uppercase;
    letter-spacing: toRem(0.8);
    font-family: "Open Sans", sans-serif;

    border-bottom: 1px solid;
    border-bottom-color: darken($color: #fff, $amount: 3%);

    @include flex-center-start();
  }
</style>
