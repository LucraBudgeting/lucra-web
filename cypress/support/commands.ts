/// <reference types="cypress" />
import { mount } from 'cypress/react18';
import './Auth.commands';
import { ITestUser } from './Auth.commands';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      isWithinViewport(): Subject;
      isOutsideViewport(): Subject;
      mount: typeof mount;
      getByDataCy(dataCy: string): Chainable<JQuery<HTMLElement>>;
      loginUser(email: string, password: string): Chainable<void>;
      registerUser(user: ITestUser): Chainable<void>;
      deleteTestUser(): Chainable<void>;
      blockTrackingRequests(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('blockTrackingRequests', () => {
  const trackingUrls = [
    '**/google-analytics.com/**',
    '**/facebook.com/tr/**',
    '**/analytics.**',
    '**/newrelic.com/**',
    '**/nr-data.net/**',
  ];

  trackingUrls.forEach((urlPattern) => {
    cy.intercept(urlPattern, {
      statusCode: 204,
      body: {},
    }).as('blockedRequest');
  });
});

Cypress.Commands.add('getByDataCy', (dataCy) => {
  return cy.get(`[data-cy=${dataCy}]`);
});
Cypress.Commands.add('mount', mount);
Cypress.Commands.add('isWithinViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.within(0, window.innerHeight);

  return subject;
});

Cypress.Commands.add('isOutsideViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).not.to.be.within(0, window.innerHeight);

  return subject;
});

Cypress.on('uncaught:exception', (_err, _runnable) => {
  // Ignore specific errors or all errors by returning false
  return false;
});
