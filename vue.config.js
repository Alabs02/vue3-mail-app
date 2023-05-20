const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/library/_colors.scss";
          @import "@/styles/library/_utilities.scss";
          @import "@/styles/library/_breakpoints.scss";
          @import "@/styles/library/_flex-mixins.scss";
        `
      }
    }
  }
});
