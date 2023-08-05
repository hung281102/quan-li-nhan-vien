const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/css/Variable.scss";`,
      },
      // sass: {
      //   additionalData: `@import "@/assets/css/Variable.sass";`,
      // },
    },
  },
});
