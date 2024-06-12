const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/',
    video: true,
    videosFolder: 'cypress/videos',
    viewportHeight: 900,
    viewportWidth: 1200,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
