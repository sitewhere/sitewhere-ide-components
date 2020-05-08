module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  css: { extract: false },
  configureWebpack: {
    externals: [
      'axios',
      'moment',
      'vue-class-component',
      'vue-color',
      'vue-property-decorator',
      'vue-router',
      'vuelidate',
      'vuetify/lib',
      'vuex',
      'sitewhere-rest-api',
      'sitewhere-ide-common'
    ],
  },
  chainWebpack: config => {
    // These are some necessary steps changing the default webpack config of the Vue CLI
    // that need to be changed in order for Typescript based components to generate their
    // declaration (.d.ts) files.
    //
    // Discussed here https://github.com/vuejs/vue-cli/issues/1081
    if (process.env.NODE_ENV === 'production') {
      config.module.rule("ts").uses.delete("cache-loader");

      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap(opts => {
          opts.transpileOnly = false;
          opts.happyPackMode = false;
          return opts;
        });
    }
  },
  parallel: false,
}