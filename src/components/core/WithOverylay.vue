<template>
  <div
    v-show="getShowOverlay"
    name="overlay"
    class="overlay"
    @keypress.esc="$emit('on-escape')"
    @click.self="$emit('close')"
  >
    <div class="overlay__content">
      <slot name="modal"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "WithOverlay",

    props: {
      showOverlay: {
        type: Boolean,
        required: true
      }
    },

    data() {
      return {};
    },
    computed: {
      getShowOverlay() {
        return this.showOverlay;
      }
    },

    created() {
      document.onkeydown = (evt) => {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          this.$emit("close");
        }
      };
    }
  });
</script>

<style lang="scss">
  .overlay {
    min-height: 100hv;
    width: 100%;
    background: rgba(35, 0, 0, 0.4);

    display: flex;
    justify-content: flex-end;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &__content {
      position: relative;

      width: 45%;
      height: 100%;
      max-height: 100%;

      display: grid;
      grid-template-rows: 85% 15%;

      background: #ffffff;
    }

    &__heading {
      width: 100%;
      height: toRem(60);

      padding: 0 toRem(32);

      font-size: toRem(18);
      font-weight: 500;
      font-family: "Open Sans", sans-serif;

      width: 90%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      border-bottom: toRem(1) solid;
      border-bottom-color: darken($color: #ffffff, $amount: 3%);

      @include flex-center-start();
    }

    &__footer {
      width: 100%;
      padding: toRem(12) toRem(32);

      border-top: toRem(1) solid;
      border-top-color: darken($color: #ffffff, $amount: 3%);

      @include flex-center-between();
    }

    &__body {
      padding: toRem(32);
      font-size: toRem(15);
      letter-spacing: toRem(0.2);
      line-height: toRem(24);
      max-height: 100%;

      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  @include breakpoint-up(xxl) {
    .overlay {
      &__content {
        grid-template-rows: 90% 10%;
      }
    }
  }
</style>
