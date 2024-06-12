const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true,
    videosFolder: 'cypress/videos',
    videoUploadOnPasses: true,
    viewportHeight: 900,
    viewportWidth: 1200,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
