const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com",
    watchForFileChanges: false,
    pageLoadTimeout: 6000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
