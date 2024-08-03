import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'h6518p',
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: '**/*.cy.{ts,tsx}',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalModifyObstructiveThirdPartyCode: true,
  },
});
