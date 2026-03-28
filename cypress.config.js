const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://blogdoagi.com.br",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    retries: 2,
    defaultCommandTimeout: 10000, 
    pageLoadTimeout: 60000,
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true, 
    screenshotOnRunFailure: true 
  }
});
