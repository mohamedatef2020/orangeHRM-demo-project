const { defineConfig } = require("cypress");
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{feature,features}',
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/',
    video: true,
    videosFolder: 'cypress/videos',
    viewportHeight: 900,
    viewportWidth: 1200,
    watchForFileChanges: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', browserify.default(config));

      return config;
    },
  },
});
