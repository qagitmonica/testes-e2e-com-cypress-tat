import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,

  e2e: {
    baseUrl: 'https://notes-serverless-app.com',

    supportFile: 'cypress/support/e2e.js',

    env: {
      viewportWidthBreakpoint: 768,
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config)
      return config
    },
  },
  projectId: 'ctf69n',
})
