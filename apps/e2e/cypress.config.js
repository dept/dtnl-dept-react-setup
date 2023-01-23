const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/specs/**/*.cy.{js,jsx,ts,tsx}',
  },
});
