import { faker } from '@faker-js/faker';

const env = Cypress.env('VITE_ENV');
const feDomain = Cypress.env(`VITE_BASE_URL_${env}`);

const TEST_PREPEND = 'TEST_5NhSgd_';

export function createRandomUser(): ITestUser {
  // return {
  //   fullName: TEST_PREPEND + faker.person.fullName(),
  //   email: 'TEST_5NhSgd_Paxton.Balistreri@yahoo.com',
  //   password: 'Password98!',
  // };

  return {
    fullName: TEST_PREPEND + faker.person.fullName(),
    email: TEST_PREPEND + faker.internet.email(),
    password: 'Password98!',
  };
}

export interface ITestUser {
  email: string;
  password: string;
  fullName: string;
}

Cypress.Commands.add('loginUser', (email: string, password: string) => {
  cy.visit('http://localhost:3030/auth/login', { timeout: 10000 });

  cy.get('#login-email', { timeout: 10000 }).type(email);
  cy.get('#login-password').type(password);

  cy.get('#auth-dialog-container').click();

  cy.get('#auth-dialog-cb-btn').click();

  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('registerUser', (user: ITestUser) => {
  // Visit the login page and navigate to the registration page
  cy.visit('http://localhost:3030/auth/login', { timeout: 10000 });
  cy.get('#login-register-footer').click();

  // Fill in the registration form
  cy.get('#registration-full-name').type(user.fullName);
  cy.get('#registration-email').type(user.email);
  cy.get('#registration-password').type(user.password);
  cy.get('#registration-confirm-password').type(user.password);

  // Trigger blur event
  cy.get('#auth-dialog-container').click();

  // Submit the registration form
  cy.get('#auth-dialog-cb-btn').click();

  cy.origin('https://checkout.stripe.com', { args: { user } }, ({ user }) => {
    cy.on('uncaught:exception', () => {
      return false;
    });

    cy.get('#cardNumber').type('4242424242424242');
    cy.get('#cardCvc').type('123');
    cy.get('#cardExpiry').type('12' + (new Date().getFullYear() + 10).toString().substring(2));
    cy.get('#billingName').type(user.fullName);
    cy.get('#billingPostalCode').type('94043');

    cy.get('.SubmitButton', { timeout: 10000 }).click();
  });

  cy.log('User registered', { feDomain, env });

  if (feDomain.includes('localhost')) {
    cy.url({ timeout: 10000 }).should('include', '/auth/login');
  } else {
    cy.origin(feDomain, () => {
      cy.url({ timeout: 10000 }).should('include', '/auth/login');
    });
  }
});
