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
