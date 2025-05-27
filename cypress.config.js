import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,

  e2e: {
    baseUrl: 'https://notes-serverless-app.com',

    supportFile: 'cypress/support/e2e.js',

    env: {
      viewportWidthBreakpoint: 768,
    },

    // Recomendado pelo Cypress (mesmo que vazio)
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
})
