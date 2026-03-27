const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://blogdoagi.com.br",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    retries: 2,
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true, 
    screenshotOnRunFailure: true 
  }
});
