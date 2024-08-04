import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

export default defineConfig({
  projectId: 'h6518p',
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: '**/*.cy.{ts,tsx}',
  },

  viewportHeight: 1080,
  viewportWidth: 1920,

  env: {
    ...env,
    ...process.env,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: false,
  },
});
