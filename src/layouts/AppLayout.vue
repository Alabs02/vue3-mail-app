<template>
  <div name="app-layout" class="app-layout">
    <div class="app-layout__sidebar">
      <div class="h-60 w-full app-layout__sidebar-logo"> Inisev </div>

      <div class="app-layout__sidebar-content">
        <template v-for="route in getRoutes()" :key="route.to">
          <nav-link :to="route.to" :title="route.title" />
        </template>
      </div>

      <div class="app-layout__sidebar-footer">
        <button class="btn btn--primary btn--block">Logout</button>
      </div>
    </div>

    <main class="app-layout__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { createNamespacedHelpers } from "vuex";

  // COMPONENTS
  import NavLink from "@/components/navigation/NavLink.vue";

  const { mapGetters } = createNamespacedHelpers("mail");

  export default defineComponent({
    name: "AppLayout",

    components: {
      NavLink
    },

    data() {
      return {
        routes: [
          {
            to: "/inbox",
            title: "Inbox"
          },
          {
            to: "/archive",
            title: "Archive"
          }
        ]
      };
    },

    computed: {
      ...mapGetters(["getArchivedEmailsCount", "getEmailsCount"])
    },

    methods: {
      getRoutes() {
        const inboxCount = this.getEmailsCount;
        const archiveCount = this.getArchivedEmailsCount;

        return [
          {
            to: "/inbox",
            title: `Inbox (${inboxCount})`
          },
          {
            to: "/archive",
            title: `Archive (${archiveCount})`
          }
        ];
      }
    }
  });
</script>

<style lang="scss" scoped>
  .app-layout {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));

    width: 100%;
    height: 100vh;

    overflow: hidden;

    position: relative;

    &__sidebar {
      background: $secondary-light;
      grid-column: span 3 / span 3;

      position: sticky;
      top: 0;
      overflow: hidden;

      display: grid;
      grid-template-rows: 60px calc(85% - 60px) 15%;

      &-logo {
        display: flex;
        align-items: center;

        text-transform: uppercase;
        padding: 0 toRem(32);
        font-size: toRem(24);
        color: darken($color: $secondary-dark, $amount: 5%);
        letter-spacing: toTem(0.5);

        font-family: "Righteous", cursive;
      }

      &-content {
        display: flex;
        flex-direction: column;
        row-gap: toRem(4);

        border-bottom-style: solid;
        border-bottom-width: toRem(1);
        border-bottom-color: darken($color: $secondary-light, $amount: 6%);
      }

      &-footer {
        display: grid;
        place-items: center;

        padding: 0 toRem(20);
      }
    }

    &__main {
      grid-column: span 9 / span 9;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  @include breakpoint-up(xxl) {
    .app-layout {
      &__sidebar {
        grid-column: span 2 / span 2;
        grid-template-rows: 60px calc(90% - 60px) 10%;
      }

      &__main {
        grid-column: span 10 / span 10;
      }
    }
  }
</style>
